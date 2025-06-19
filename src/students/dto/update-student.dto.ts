import { IsString, IsPhoneNumber, IsOptional, Length, IsEnum } from 'class-validator';

export enum StudentRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}


export class UpdateStudentDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @Length(1, 255, { message: 'Name must be between 1 and 255 characters' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Login must be a string' })
  @Length(1, 255, { message: 'Login must be between 1 and 255 characters' })
  login?: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @Length(1, 255, { message: 'Password must be between 1 and 255 characters' })
  password?: string;

  @IsOptional()
  @IsPhoneNumber('UZ', { message: 'Invalid phone number format for Uzbekistan' })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: 'Parent name must be a string' })
  @Length(1, 255, { message: 'Parent name must be between 1 and 255 characters' })
  parentName?: string;

  @IsOptional()
  @IsPhoneNumber('UZ', { message: 'Invalid phone number format for Uzbekistan' })
  parentPhoneNumber?: string;

  @IsOptional()
  @IsString({ message: 'Image must be a string' })
  @Length(0, 255, { message: 'Image must be between 0 and 255 characters' })
  img?: string;

  @IsOptional()
  @IsEnum(StudentRole, { message: 'Invalid role value' })
  role?: StudentRole;

  @IsOptional()
  @IsString({ message: 'Course ID must be a string' })
  courseId?: string;
}