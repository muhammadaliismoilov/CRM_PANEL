import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, Length } from 'class-validator';
import { Role } from '../teachers.model';

export class CreateTeacherDto {
  @ApiProperty({ example: 'Ali Valiev', description: 'O‘qituvchining to‘liq ismi' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '+998901234567', description: 'O‘qituvchining telefon raqami' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: 'ali_valiev', description: 'O‘qituvchining login nomi (maks. 50 belgigacha)' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  login: string;

  @ApiProperty({ example: 'password123', description: 'O‘qituvchining paroli' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: Role, example: Role.TEACHER, description: 'O‘qituvchining roli' })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty({ example: 'http://example.com/image.jpg', description: 'O‘qituvchining rasm URL manzili', required: false })
  @IsString()
  @IsOptional()
  img?: string;
}