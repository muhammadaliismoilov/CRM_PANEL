import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Role } from "../teachers.model";
export class UpdateTeacherDto {
  @ApiProperty({ example: 'Ali Valiev', description: 'O‘qituvchining to‘liq ismi', required: false })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ example: '+998901234567', description: 'O‘qituvchining telefon raqami', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ example: 'ali_valiev', description: 'O‘qituvchining login nomi (maks. 50 belgigacha)', required: false })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  login?: string;

  @ApiProperty({ example: 'newpassword123', description: 'O‘qituvchining yangi paroli', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ enum: Role, example: Role.ADMIN, description: 'O‘qituvchining roli', required: false })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty({ example: 'http://example.com/newimage.jpg', description: 'O‘qituvchining rasm URL manzili', required: false })
  @IsString()
  @IsOptional()
  img?: string;
}