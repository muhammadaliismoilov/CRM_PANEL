import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { courses } from '../models/courses.model';

@Module({
  imports: [SequelizeModule.forFeature([courses])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}