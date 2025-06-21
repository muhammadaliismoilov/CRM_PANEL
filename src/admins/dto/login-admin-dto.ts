import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginAdminDto {
  @IsNotEmpty({ message: 'Login kiritilishi shart' })
  @IsString({ message: 'Login satr bo‘lishi kerak' })
  @Length(3, 50, { message: 'Login 3 dan 50 belgigacha bo‘lishi kerak' })
  login: string;

  @IsNotEmpty({ message: 'Parol kiritilishi shart' })
  @IsString({ message: 'Parol satr bo‘lishi kerak' })
  @Length(6, 255, { message: 'Parol 6 dan 255 belgigacha bo‘lishi kerak' })
  password: string;
}