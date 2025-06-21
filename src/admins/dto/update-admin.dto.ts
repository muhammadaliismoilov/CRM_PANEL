import { IsOptional, IsString, IsEnum, Matches, Length } from 'class-validator';
import { Role } from '../admins.model';

export class UpdateAdminDto {
  @IsOptional()
  @IsString({ message: 'To‘liq ism satr bo‘lishi kerak' })
  @Length(1, 255, { message: 'To‘liq ism 1 dan 255 belgigacha bo‘lishi kerak' })
  fullName?: string;

  @IsOptional()
  @IsString({ message: 'Telefon raqami satr bo‘lishi kerak' })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: 'Login satr bo‘lishi kerak' })
  @Length(3, 50, { message: 'Login 3 dan 50 belgigacha bo‘lishi kerak' })
  login?: string;

  @IsOptional()
  @IsString({ message: 'Parol satr bo‘lishi kerak' })
  @Length(6, 255, { message: 'Parol 6 dan 255 belgigacha bo‘lishi kerak' })
  password?: string;

}