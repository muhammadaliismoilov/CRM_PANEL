import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto} from './dto/create-student.dto';
import{UpdateStudentDto } from './dto/update-student.dto'
import { students } from './student.model';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Yangi talaba yaratish' })
  @ApiResponse({ status: 201, description: 'Talaba muvaffaqiyatli yaratildi', type: students })
  @ApiResponse({ status: 409, description: 'Login allaqachon ishlatilgan' })
  @ApiBody({ type: CreateStudentDto })
  async create(@Body() createStudentDto: CreateStudentDto): Promise<students> {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha talabalarni olish' })
  @ApiResponse({ status: 200, description: 'Talabalar ro‘yxati', type: [students] })
  async findAll(): Promise<students[]> {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha talabani olish' })
  @ApiParam({ name: 'id', description: 'Talabaning UUID identifikatori', type: String })
  @ApiResponse({ status: 200, description: 'Talaba ma‘lumotlari', type: students })
  @ApiResponse({ status: 404, description: 'Talaba topilmadi' })
  async findOne(@Param('id') id: string): Promise<students> {
    return this.studentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Talaba ma‘lumotlarini yangilash' })
  @ApiParam({ name: 'id', description: 'Talabaning UUID identifikatori', type: String })
  @ApiBody({ type: UpdateStudentDto })
  @ApiResponse({ status: 200, description: 'Talaba muvaffaqiyatli yangilandi', type: students })
  @ApiResponse({ status: 404, description: 'Talaba topilmadi' })
  @ApiResponse({ status: 409, description: 'Login allaqachon ishlatilgan' })
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<students> {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Talabani o‘chirish' })
  @ApiParam({ name: 'id', description: 'Talabaning UUID identifikatori', type: String })
  @ApiResponse({ status: 204, description: 'Talaba muvaffaqiyatli o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Talaba topilmadi' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.studentsService.remove(id);
  }
}