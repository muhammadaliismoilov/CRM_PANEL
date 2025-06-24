import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateAttendanceDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Talaba ID’si' })
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'Kurs ID’si' })
  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({ example: true, description: 'Davomat holati (true - hozir, false - yo‘q)' })
  @IsBoolean()
  @IsNotEmpty()
  present: boolean;
}