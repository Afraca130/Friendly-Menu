import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/menu.dto';
import { Restaurant } from '../restaurants/entities/restaurant.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menusRepository: Repository<Menu>,
  ) {}

  async create(
    createMenuDto: CreateMenuDto,
    restaurant: Restaurant,
  ): Promise<Menu> {
    const menu = this.menusRepository.create({
      ...createMenuDto,
      restaurant,
    });
    return this.menusRepository.save(menu);
  }

  async findAll(restaurantId: number): Promise<Menu[]> {
    return this.menusRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['restaurant'],
    });
  }

  async findOne(id: number): Promise<Menu> {
    const menu = await this.menusRepository.findOne({
      where: { id },
      relations: ['restaurant'],
    });
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    return menu;
  }

  async update(id: number, updateMenuDto: CreateMenuDto): Promise<Menu> {
    const menu = await this.findOne(id);
    Object.assign(menu, updateMenuDto);
    return this.menusRepository.save(menu);
  }

  async remove(id: number): Promise<void> {
    const menu = await this.findOne(id);
    await this.menusRepository.remove(menu);
  }
}
