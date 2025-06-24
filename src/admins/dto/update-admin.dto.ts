import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, Matches, IsOptional } from 'class-validator';
import { Role } from '../admins.model';

export class UpdateAdminDto {
  @ApiProperty({ example: 'Ali Valiev', description: 'Adminning to‘liq ismi', required: false })
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami', required: false })
  @IsString()
  @Length(10, 20)
  @Matches(/^\+998[0-9]{9}$/, { message: 'Telefon raqami +998 bilan boshlanishi va 9 raqamdan iborat bo‘lishi kerak' })
  phoneNumber?: string;

  @ApiProperty({ example: 'ali_admin', description: 'Login (maks. 50 belgi)', required: false })
  @IsString()
  @Length(1, 50)
  login?: string;

  @ApiProperty({ example: 'newpassword123', description: 'Parol', required: false })
  @IsString()
  password?: string;

  @ApiProperty({ example: Role.SUPERADMIN, description: 'Rol', enum: Role, required: false })
  @IsOptional()
  role?: Role;
}