import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsBoolean, Length } from 'class-validator';
import { Role } from '../student.model';

export class CreateStudentDto {
  @ApiProperty({ example: 'Azizbek Karimov', description: 'Talabaning to‘liq ismi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'azizbek_karimov', description: 'Talabaning login nomi (maks. 50 belgigacha)' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  login: string;

  @ApiProperty({ example: 'password123', description: 'Talabaning paroli' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '+998901234567', description: 'Talabaning telefon raqami' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  phoneNumber: string;

  @ApiProperty({ example: 'Karimjon Abdullaev', description: 'Ota-onaning ismi' })
  @IsString()
  @IsNotEmpty()
  parentName: string;

  @ApiProperty({ example: '+998907654321', description: 'Ota-onaning telefon raqami' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  parentPhoneNumber: string;

  @ApiProperty({ example: 'http://example.com/image.jpg', description: 'Talabaning rasm URL manzili', required: false })
  @IsString()
  @IsOptional()
  img?: string;

  @ApiProperty({ enum: Role, example: Role.STUDENT, description: 'Talabaning roli', required: false })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty({ example: false, description: 'To‘lov holati', required: false })
  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;
}
