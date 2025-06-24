import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseStudentDto } from './create-couses-student.dto';

export class UpdateCousesStudentDto extends PartialType(CreateCourseStudentDto) {}
