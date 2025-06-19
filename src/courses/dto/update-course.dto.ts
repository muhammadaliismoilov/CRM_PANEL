import { IsString, IsPhoneNumber, IsOptional, Length } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsString({ message: 'Course name must be a string' })
  @Length(1, 255, { message: 'Course name must be between 1 and 255 characters' })
  courseName?: string;

  @IsOptional()
  @IsString({ message: 'Lesson days must be a string' })
  @Length(1, 255, { message: 'Lesson days must be between 1 and 255 characters' })
  lessonDays?: string;

  @IsOptional()
  @IsString({ message: 'Lesson time must be a string' })
  @Length(1, 50, { message: 'Lesson time must be between 1 and 50 characters' })
  lessonTime?: string;

  @IsOptional()
  @IsString({ message: 'Teacher name must be a string' })
  @Length(1, 255, { message: 'Teacher name must be between 1 and 255 characters' })
  teacherName?: string;

  @IsOptional()
  @IsPhoneNumber('UZ', { message: 'Invalid phone number format for Uzbekistan' })
  teacherPhoneNumber?: string;

  @IsOptional()
  @IsString({ message: 'Teacher image must be a string' })
  @Length(0, 255, { message: 'Teacher image must be between 0 and 255 characters' })
  teacherImg?: string;
}