import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional, Length, IsEnum } from 'class-validator';
enum StudentRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(1, 255, { message: 'Name must be between 1 and 255 characters' })
  name: string;

  @IsNotEmpty({ message: 'Login is required' })
  @IsString({ message: 'Login must be a string' })
  @Length(1, 255, { message: 'Login must be between 1 and 255 characters' })
  login: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Length(1, 255, { message: 'Password must be between 1 and 255 characters' })
  password: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsPhoneNumber('UZ', { message: 'Invalid phone number format for Uzbekistan' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Parent name is required' })
  @IsString({ message: 'Parent name must be a string' })
  @Length(1, 255, { message: 'Parent name must be between 1 and 255 characters' })
  parentName: string;

  @IsNotEmpty({ message: 'Parent phone number is required' })
  @IsPhoneNumber('UZ', { message: 'Invalid phone number format for Uzbekistan' })
  parentPhoneNumber: string;

  @IsOptional()
  @IsString({ message: 'Image must be a string' })
  @Length(0, 255, { message: 'Image must be between 0 and 255 characters' })
  img?: string;

  @IsEnum(StudentRole, { message: 'Invalid role value' })
  role: StudentRole;

  @IsOptional()
  @IsString({ message: 'Course ID must be a string' })
  courseId?: string;
}
