import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableType } from './entities/table-type.entity';
import { CreateTableTypeDto } from './dto/create-table-type.dto';
import { UpdateTableTypeDto } from './dto/update-table-type.dto';

@Injectable()
export class TableTypesService {
  constructor(
    @InjectRepository(TableType)
    private tableTypesRepository: Repository<TableType>,
  ) {}

  async create(createTableTypeDto: CreateTableTypeDto): Promise<TableType> {
    const tableType = this.tableTypesRepository.create(createTableTypeDto);
    return await this.tableTypesRepository.save(tableType);
  }

  async findAll(): Promise<TableType[]> {
    return await this.tableTypesRepository.find();
  }

  async findOne(id: number): Promise<TableType> {
    const tableType = await this.tableTypesRepository.findOne({
      where: { id },
    });
    if (!tableType) {
      throw new NotFoundException(`TableType with ID ${id} not found`);
    }
    return tableType;
  }

  async update(
    id: number,
    updateTableTypeDto: UpdateTableTypeDto,
  ): Promise<TableType> {
    const tableType = await this.findOne(id);
    Object.assign(tableType, updateTableTypeDto);
    return await this.tableTypesRepository.save(tableType);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tableTypesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TableType with ID ${id} not found`);
    }
  }

  async findByRestaurant(restaurantId: number): Promise<TableType[]> {
    return await this.tableTypesRepository.find({
      where: { restaurant: { id: restaurantId } },
    });
  }
}
