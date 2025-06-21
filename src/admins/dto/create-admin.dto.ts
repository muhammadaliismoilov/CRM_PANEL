import { IsNotEmpty, IsString, IsEnum, Matches, Length } from 'class-validator';
import { Role } from '../admins.model';

export class CreateAdminDto {
  @IsNotEmpty({ message: 'To‘liq ism kiritilishi shart' })
  @IsString({ message: 'To‘liq ism satr bo‘lishi kerak' })
  @Length(1, 255, { message: 'To‘liq ism 1 dan 255 belgigacha bo‘lishi kerak' })
  fullName: string;

  @IsNotEmpty({ message: 'Telefon raqami kiritilishi shart' })
  @IsString({ message: 'Telefon raqami satr bo‘lishi kerak' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Login kiritilishi shart' })
  @IsString({ message: 'Login satr bo‘lishi kerak' })
  @Length(3, 50, { message: 'Login 3 dan 50 belgigacha bo‘lishi kerak' })
  login: string;

  @IsNotEmpty({ message: 'Parol kiritilishi shart' })
  @IsString({ message: 'Parol satr bo‘lishi kerak' })
  @Length(6, 255, { message: 'Parol 6 dan 255 belgigacha bo‘lishi kerak' })
  password: string;

}