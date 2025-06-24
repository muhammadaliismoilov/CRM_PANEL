import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, Length, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'Matematika', description: 'Kurs nomi' })
  @IsString()
  @IsNotEmpty()
  courseName: string;

  @ApiProperty({ example: 'Dushanba, Chorshanba, Juma', description: 'Dars kunlari' })
  @IsString()
  @IsNotEmpty()
  lessonDays: string;

  @ApiProperty({ example: '10:00-12:00', description: 'Dars vaqti (maks. 50 belgigacha)' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  lessonTime: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'O‘qituvchi ID’si' })
  @IsUUID()
  @IsNotEmpty()
  teacherId: string;
}