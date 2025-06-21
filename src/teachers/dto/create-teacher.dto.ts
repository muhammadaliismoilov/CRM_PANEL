import { IsNotEmpty, IsString, IsEnum, IsOptional, IsUUID, Matches, Length } from 'class-validator';
import { Role } from '../teachers.model';

export class CreateTeacherDto {
  @IsNotEmpty({ message: 'To‘liq ism kiritilishi shart' })
  @IsString({ message: 'To‘liq ism satr bo‘lishi kerak' })
  @Length(1, 255, { message: 'To‘liq ism 1 dan 255 belgigacha bo‘lishi kerak' })
  fullName: string;

  @IsNotEmpty({ message: 'Telefon raqami kiritilishi shart' })
  @IsString({ message: 'Telefon raqami satr bo‘lishi kerak' })
  number: string;

  @IsNotEmpty({ message: 'Login kiritilishi shart' })
  @IsString({ message: 'Login satr bo‘lishi kerak' })
  @Length(3, 50, { message: 'Login 3 dan 50 belgigacha bo‘lishi kerak' })
  login: string;

  @IsNotEmpty({ message: 'Parol kiritilishi shart' })
  @IsString({ message: 'Parol satr bo‘lishi kerak' })
  @Length(6, 255, { message: 'Parol 6 dan 255 belgigacha bo‘lishi kerak' })
  password: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Rol teacher, admin yoki superadmin bo‘lishi kerak' })
  role: Role;

  @IsOptional()
  @IsString({ message: 'Rasm satr bo‘lishi kerak' })
  @Length(0, 255, { message: 'Rasm URL 0 dan 255 belgigacha bo‘lishi kerak' })
  img?: string;
}