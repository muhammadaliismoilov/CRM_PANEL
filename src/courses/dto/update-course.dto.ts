import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, Length, IsUUID } from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty({ example: 'Matematika', description: 'Kurs nomi', required: false })
  @IsString()
  @IsOptional()
  courseName?: string;

  @ApiProperty({ example: 'Dushanba, Chorshanba, Juma', description: 'Dars kunlari', required: false })
  @IsString()
  @IsOptional()
  lessonDays?: string;

  @ApiProperty({ example: '10:00-12:00', description: 'Dars vaqti (maks. 50 belgigacha)', required: false })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  lessonTime?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'O‘qituvchi ID’si', required: false })
  @IsUUID()
  @IsOptional()
  teacherId?: string;
}