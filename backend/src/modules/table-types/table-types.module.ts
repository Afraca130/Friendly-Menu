import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableType } from './entities/table-type.entity';
import { TableTypesService } from './table-types.service';
import { TableTypesController } from './table-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TableType])],
  controllers: [TableTypesController],
  providers: [TableTypesService],
  exports: [TableTypesService],
})
export class TableTypesModule {}
