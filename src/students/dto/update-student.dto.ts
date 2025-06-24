import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsBoolean, Length } from 'class-validator';
import { Role } from '../student.model';


export class UpdateStudentDto {
  @ApiProperty({ example: 'Azizbek Karimov', description: 'Talabaning to‘liq ismi', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'azizbek_karimov', description: 'Talabaning login nomi (maks. 50 belgigacha)', required: false })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  login?: string;

  @ApiProperty({ example: 'newpassword123', description: 'Talabaning yangi paroli', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: '+998901234567', description: 'Talabaning telefon raqami', required: false })
  @IsString()
  @IsOptional()
  @Length(1, 20)
  phoneNumber?: string;

  @ApiProperty({ example: 'Karimjon Abdullaev', description: 'Ota-onaning ismi', required: false })
  @IsString()
  @IsOptional()
  parentName?: string;

  @ApiProperty({ example: '+998907654321', description: 'Ota-onaning telefon raqami', required: false })
  @IsString()
  @IsOptional()
  @Length(1, 20)
  parentPhoneNumber?: string;

  @ApiProperty({ example: 'http://example.com/newimage.jpg', description: 'Talabaning rasm URL manzili', required: true })
  @IsString()
  @IsOptional()
  img?: string;

  @ApiProperty({ enum: Role, example: Role.STUDENT, description: 'Talabaning roli',default:Role.STUDENT, required: true })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty({ example: true, description: 'To‘lov holati',default:false, required: true })
  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;
}