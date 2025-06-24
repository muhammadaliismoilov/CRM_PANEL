import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { teachers } from './teachers.model';
import { courses } from '../courses/courses.model';
import { payments } from '../payment/payment.model';

@Module({
  imports: [SequelizeModule.forFeature([teachers, courses, payments])],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}