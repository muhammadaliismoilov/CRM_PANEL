import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateAttendanceDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Talaba ID’si', required: false })
  @IsUUID()
  @IsNotEmpty()
  studentId?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'Kurs ID’si', required: false })
  @IsUUID()
  @IsNotEmpty()
  courseId?: string;

  @ApiProperty({ example: false, description: 'Davomat holati (true - hozir, false - yo‘q)', required: false })
  @IsBoolean()
  present?: boolean;
}