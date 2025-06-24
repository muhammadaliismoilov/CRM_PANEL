import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty, Length } from 'class-validator';



export class UpdatePaymentDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Talaba ID’si', required: false })
  @IsUUID()
  @IsNotEmpty()
  studentId?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'Kurs ID’si', required: false })
  @IsUUID()
  @IsNotEmpty()
  courseId?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440002', description: 'O‘qituvchi ID’si', required: false })
  @IsUUID()
  @IsNotEmpty()
  teacherId?: string;

  @ApiProperty({ example: '+998901234567', description: 'Talabaning telefon raqami (maks. 50 belgigacha)', required: false })
  @IsString()
  @Length(1, 50)
  studentPhoneNumber?: string;
}