import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('restaurants/:restaurantId/menus')
@UseGuards(JwtAuthGuard)
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  create(
    @Param('restaurantId') restaurantId: string,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    return this.menusService.create(createMenuDto, {
      id: +restaurantId,
    } as any);
  }

  @Get()
  findAll(@Param('restaurantId') restaurantId: string) {
    return this.menusService.findAll(+restaurantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: CreateMenuDto) {
    return this.menusService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}
