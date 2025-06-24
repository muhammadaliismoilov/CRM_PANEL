import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseStudentService } from './couses-student.service';
import { CourseStudentController } from './couses-student.controller';
import { course_student } from './courses-student.model';
import { courses } from '../courses/courses.model';
import { students } from '../students/student.model';

@Module({
  imports: [SequelizeModule.forFeature([course_student, courses, students])],
  controllers: [CourseStudentController],
  providers: [CourseStudentService],
})
export class CourseStudentModule {}