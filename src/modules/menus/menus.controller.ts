import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Headers,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('menus')
@ApiBearerAuth()
@Controller('menus')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Create a new menu item' })
  @ApiResponse({
    status: 201,
    description: 'Menu item created successfully with automatic translations',
  })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menu items' })
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific menu item' })
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Get(':id/translated')
  @ApiOperation({ summary: 'Get menu item with translations' })
  @ApiQuery({
    name: 'lang',
    required: true,
    description: 'Target language code (e.g., en, ja, zh-CN)',
  })
  async getTranslatedMenu(
    @Param('id') id: string,
    @Query('lang') language: string,
  ) {
    return this.menusService.findWithTranslation(+id, language);
  }

  @Patch(':id')
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Update a menu item' })
  @ApiResponse({
    status: 200,
    description:
      'Menu item updated successfully, translations will be updated in background',
  })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Delete a menu item' })
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }

  @Get('restaurant/:restaurantId')
  @ApiOperation({ summary: 'Get menu items by restaurant' })
  @ApiQuery({
    name: 'lang',
    required: false,
    description: 'Target language for translations',
  })
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: 'Preferred language from HTTP header',
  })
  async findByRestaurant(
    @Param('restaurantId') restaurantId: string,
    @Query('lang') language?: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    // 언어 우선순위: 1. Query param, 2. Header, 3. 기본값
    const targetLanguage = language || acceptLanguage?.split(',')[0] || 'en';

    if (language) {
      return this.menusService.getMenusWithLanguage(
        +restaurantId,
        targetLanguage,
      );
    }

    return this.menusService.findByRestaurant(+restaurantId);
  }
}
