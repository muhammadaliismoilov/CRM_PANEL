import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { students } from './student.model';
import { courses } from '../courses/courses.model';
import { payments } from '../payment/payment.model';
import { attendances } from '../attendance/attendance.model';
import { course_student } from '../couses-student/courses-student.model';

@Module({
  imports: [SequelizeModule.forFeature([students, courses, payments, attendances, course_student])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}