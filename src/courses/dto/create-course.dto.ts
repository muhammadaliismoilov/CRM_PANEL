import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional, Length } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty({ message: 'Course name is required' })
  @IsString({ message: 'Course name must be a string' })
  @Length(1, 255, { message: 'Course name must be between 1 and 255 characters' })
  courseName: string;

  @IsNotEmpty({ message: 'Lesson days are required' })
  @IsString({ message: 'Lesson days must be a string' })
  @Length(1, 255, { message: 'Lesson days must be between 1 and 255 characters' })
  lessonDays: string;

  @IsNotEmpty({ message: 'Lesson time is required' })
  @IsString({ message: 'Lesson time must be a string' })
  @Length(1, 50, { message: 'Lesson time must be between 1 and 50 characters' })
  lessonTime: string;

  @IsNotEmpty({ message: 'Teacher name is required' })
  @IsString({ message: 'Teacher name must be a string' })
  @Length(1, 255, { message: 'Teacher name must be between 1 and 255 characters' })
  teacherName: string;

  @IsNotEmpty({ message: 'Teacher phone number is required' })
  @IsPhoneNumber('UZ', { message: 'Invalid phone number format for Uzbekistan' })
  teacherPhoneNumber: string;

  @IsOptional()
  @IsString({ message: 'Teacher image must be a string' })
  @Length(0, 255, { message: 'Teacher image must be between 0 and 255 characters' })
  teacherImg?: string;
}