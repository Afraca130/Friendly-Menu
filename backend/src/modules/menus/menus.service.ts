import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuTranslationsService } from '../menu-translations/menu-translations.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MenusService {
  private supportedLanguages: string[];

  constructor(
    @InjectRepository(Menu)
    private menusRepository: Repository<Menu>,
    private menuTranslationsService: MenuTranslationsService,
    private configService: ConfigService,
  ) {
    // 지원하는 언어 목록을 환경 변수에서 가져옴
    this.supportedLanguages = this.configService
      .get<string>('SUPPORTED_LANGUAGES', 'en,ja,zh-CN,es,fr')
      .split(',');
  }

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    // 메뉴 생성
    const menu = this.menusRepository.create({
      ...createMenuDto,
      restaurant: { id: createMenuDto.restaurantId },
    });

    const savedMenu = await this.menusRepository.save(menu);

    // 자동 번역 처리 (비동기로 백그라운드에서 처리)
    this.translateMenuContent(savedMenu).catch((error) => {
      console.error('Menu translation failed:', error);
      // 번역 실패는 메뉴 생성을 막지 않음
    });

    return savedMenu;
  }

  private async translateMenuContent(menu: Menu): Promise<void> {
    // 번역할 텍스트 준비
    const textsToTranslate = [
      { field: 'name', text: menu.name },
      { field: 'description', text: menu.description },
    ];

    // 각 지원 언어로 번역
    const translationPromises = [];

    for (const targetLanguage of this.supportedLanguages) {
      for (const { field, text } of textsToTranslate) {
        if (text) {
          translationPromises.push(
            this.menuTranslationsService.translateText(
              text,
              targetLanguage,
              menu.id,
              field,
            ),
          );
        }
      }
    }

    // 모든 번역 병렬 처리
    await Promise.allSettled(translationPromises);
  }

  async findAll(): Promise<Menu[]> {
    return await this.menusRepository.find({
      relations: ['restaurant', 'translations'],
    });
  }

  async findOne(id: number): Promise<Menu> {
    const menu = await this.menusRepository.findOne({
      where: { id },
      relations: ['restaurant', 'translations'],
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }

  async findByRestaurant(restaurantId: number): Promise<Menu[]> {
    return await this.menusRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['translations'],
    });
  }

  async findWithTranslation(
    id: number,
    language: string,
  ): Promise<{
    menu: Menu;
    translations: { [key: string]: string };
  }> {
    const menu = await this.findOne(id);

    // 해당 언어의 번역 찾기
    const translations = menu.translations.filter(
      (t) => t.targetLanguage === language && t.isVerified,
    );

    // 번역 결과를 필드별로 정리
    const translationMap: { [key: string]: string } = {};
    for (const translation of translations) {
      if (translation.field) {
        translationMap[translation.field] = translation.translatedText;
      }
    }

    return {
      menu,
      translations: translationMap,
    };
  }

  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.findOne(id);

    // 변경된 필드 추적
    const changedFields: string[] = [];
    if (updateMenuDto.name && updateMenuDto.name !== menu.name) {
      changedFields.push('name');
    }
    if (
      updateMenuDto.description &&
      updateMenuDto.description !== menu.description
    ) {
      changedFields.push('description');
    }

    // 메뉴 업데이트
    Object.assign(menu, updateMenuDto);
    const updatedMenu = await this.menusRepository.save(menu);

    // 변경된 필드만 재번역
    if (changedFields.length > 0) {
      this.retranslateChangedFields(updatedMenu, changedFields).catch(
        (error) => {
          console.error('Menu retranslation failed:', error);
        },
      );
    }

    return updatedMenu;
  }

  private async retranslateChangedFields(
    menu: Menu,
    changedFields: string[],
  ): Promise<void> {
    // 기존 번역 무효화
    await this.menuTranslationsService.invalidateTranslations(
      menu.id,
      changedFields,
    );

    // 재번역
    const translationPromises = [];

    for (const targetLanguage of this.supportedLanguages) {
      for (const field of changedFields) {
        const text = menu[field as keyof Menu] as string;
        if (text) {
          translationPromises.push(
            this.menuTranslationsService.translateText(
              text,
              targetLanguage,
              menu.id,
              field,
            ),
          );
        }
      }
    }

    await Promise.allSettled(translationPromises);
  }

  async remove(id: number): Promise<void> {
    const menu = await this.findOne(id);
    await this.menusRepository.remove(menu);
  }

  async getMenusWithLanguage(
    restaurantId: number,
    language: string,
  ): Promise<any[]> {
    const menus = await this.findByRestaurant(restaurantId);

    return Promise.all(
      menus.map(async (menu) => {
        const { translations } = await this.findWithTranslation(
          menu.id,
          language,
        );

        return {
          id: menu.id,
          name: translations.name || menu.name,
          description: translations.description || menu.description,
          price: menu.price,
          imageUrl: menu.imageUrl,
          isAvailable: menu.isAvailable,
          originalName: menu.name,
          originalDescription: menu.description,
          isTranslated: !!translations.name || !!translations.description,
        };
      }),
    );
  }
}
