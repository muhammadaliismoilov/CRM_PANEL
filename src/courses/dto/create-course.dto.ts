import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional, Length } from 'class-validator';

// Kurs yaratish uchun ma'lumotlar tuzilmasi (DTO)
export class CreateCourseDto {
  // Kurs nomi majburiy bo‘lib, satr bo‘lishi va 1-255 belgi oralig‘ida bo‘lishi kerak
  @IsNotEmpty({ message: 'Kurs nomi kiritilishi shart' })
  @IsString({ message: 'Kurs nomi satr bo‘lishi kerak' })
  @Length(1, 255, { message: 'Kurs nomi 1 dan 255 belgigacha bo‘lishi kerak' })
  courseName: string;

  // Dars kunlari majburiy bo‘lib, satr bo‘lishi va 1-255 belgi oralig‘ida bo‘lishi kerak
  @IsNotEmpty({ message: 'Dars kunlari kiritilishi shart' })
  @IsString({ message: 'Dars kunlari satr bo‘lishi kerak' })
  @Length(1, 255, { message: 'Dars kunlari 1 dan 255 belgigacha bo‘lishi kerak' })
  lessonDays: string;

  // Dars vaqti majburiy bo‘lib, satr bo‘lishi va 1-50 belgi oralig‘ida bo‘lishi kerak
  @IsNotEmpty({ message: 'Dars vaqti kiritilishi shart' })
  @IsString({ message: 'Dars vaqti satr bo‘lishi kerak' })
  @Length(1, 50, { message: 'Dars vaqti 1 dan 50 belgigacha bo‘lishi kerak' })
  lessonTime: string;

  // O‘qituvchi ismi majburiy bo‘lib, satr bo‘lishi va 1-255 belgi oralig‘ida bo‘lishi kerak
  @IsNotEmpty({ message: 'O‘qituvchi ID kiritilishi shart' })
  @IsString({ message: 'O‘qituvchi ID satr bo‘lishi kerak' })
  @Length(1, 255, { message: 'O‘qituvchi ID 1 dan 255 belgigacha bo‘lishi kerak' })
  teacherId: string;

  
}