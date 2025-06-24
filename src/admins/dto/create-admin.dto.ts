import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';
import { Role } from '../admins.model';
export class CreateAdminDto {
  @ApiProperty({ example: 'Ali Valiev', description: 'Adminning to‘liq ismi' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @IsString()
  @IsNotEmpty()
  @Length(10, 20)
  @Matches(/^\+998[0-9]{9}$/, { message: 'Telefon raqami +998 bilan boshlanishi va 9 raqamdan iborat bo‘lishi kerak' })
  phoneNumber: string;

  @ApiProperty({ example: 'ali_admin', description: 'Login (maks. 50 belgi)' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  login: string;

  @ApiProperty({ example: 'password123', description: 'Parol' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: Role.ADMIN, description: 'Rol (default: ADMIN)', enum: Role, required: false })
  role?: Role;
}
