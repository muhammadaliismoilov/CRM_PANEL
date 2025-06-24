import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { students } from '../students/student.model';
import { teachers } from '../teachers/teachers.model';
import { courses } from '../courses/courses.model';
import { attendances } from '../attendance/attendance.model';

@Module({
  imports: [SequelizeModule.forFeature([students, teachers, courses, attendances])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}