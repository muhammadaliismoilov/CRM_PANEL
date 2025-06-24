import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { attendances } from './attendance.model';
import { students } from '../students/student.model';
import { courses } from '../courses/courses.model';

@Module({
  imports: [SequelizeModule.forFeature([attendances, students, courses])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}