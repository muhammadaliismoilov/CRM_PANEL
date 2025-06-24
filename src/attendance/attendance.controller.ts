import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { attendances } from './attendance.model';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Roles } from 'src/guards/roles.decarator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('attendances')
@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin','teacher')
  @ApiOperation({ summary: 'Yangi davomat qo‘shish' })
  @ApiResponse({ status: 201, description: 'Davomat muvaffaqiyatli qo‘shildi', type: attendances })
  @ApiResponse({ status: 404, description: 'Talaba yoki kurs topilmadi' })
  @ApiBody({ type: CreateAttendanceDto })
  async create(@Body() createAttendanceDto: CreateAttendanceDto): Promise<attendances> {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get("/getAll")
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin','teacher')
  @ApiOperation({ summary: 'Barcha davomat yozuvlarini olish' })
  @ApiResponse({ status: 200, description: 'Davomat ro‘yxati', type: [attendances] })
  async findAll(): Promise<attendances[]> {
    return this.attendanceService.findAll();
  }

  @Get('/getOne/:id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin','teacher')
  @ApiOperation({ summary: 'ID bo‘yicha davomatni olish' })
  @ApiParam({ name: 'id', description: 'Davomatning UUID identifikatori', type: String })
  @ApiResponse({ status: 200, description: 'Davomat ma‘lumotlari', type: attendances })
  @ApiResponse({ status: 404, description: 'Davomat topilmadi' })
  async findOne(@Param('id') id: string): Promise<attendances> {
    return this.attendanceService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Davomat ma‘lumotlarini yangilash' })
  @ApiParam({ name: 'id', description: 'Davomatning UUID identifikatori', type: String })
  @ApiBody({ type: UpdateAttendanceDto })
  @ApiResponse({ status: 200, description: 'Davomat muvaffaqiyatli yangilandi', type: attendances })
  @ApiResponse({ status: 404, description: 'Davomat yoki bog‘liq ma‘lumotlar topilmadi' })
  async update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto): Promise<attendances> {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Davomatni o‘chirish' })
  @ApiParam({ name: 'id', description: 'Davomatning UUID identifikatori', type: String })
  @ApiResponse({ status: 204, description: 'Davomat muvaffaqiyatli o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Davomat topilmadi' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.attendanceService.remove(id);
  }
}