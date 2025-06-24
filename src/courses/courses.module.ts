import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { courses } from './courses.model';
import { students } from '../students/student.model';
import { teachers } from '../teachers/teachers.model';
import { payments } from '../payment/payment.model';
import { attendances } from '../attendance/attendance.model';
import { course_student } from '../couses-student/courses-student.model';

@Module({
  imports: [SequelizeModule.forFeature([courses, students, teachers, payments, attendances, course_student])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}