import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto} from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { courses } from './courses.model';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/guards/roles.decarator';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Yangi kurs yaratish' })
  @ApiResponse({ status: 201, description: 'Kurs muvaffaqiyatli yaratildi', type: courses })
  @ApiBody({ type: CreateCourseDto })
  async create(@Body() createCourseDto: CreateCourseDto): Promise<courses> {
    return this.coursesService.create(createCourseDto);
  }

  @Get("/getAll")
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Barcha kurslarni olish' })
  @ApiResponse({ status: 200, description: 'Kurslar ro‘yxati', type: [courses] })
  async findAll(): Promise<courses[]> {
    return this.coursesService.findAll();
  }

  @Get('/getOne:id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin','teacher')
  @ApiOperation({ summary: 'ID bo‘yicha kursni olish' })
  @ApiParam({ name: 'id', description: 'Kursning UUID identifikatori', type: String })
  @ApiResponse({ status: 200, description: 'Kurs ma‘lumotlari', type: courses })
  @ApiResponse({ status: 404, description: 'Kurs topilmadi' })
  async findOne(@Param('id') id: string): Promise<courses> {
    return this.coursesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Kurs ma‘lumotlarini yangilash' })
  @ApiParam({ name: 'id', description: 'Kursning UUID identifikatori', type: String })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, description: 'Kurs muvaffaqiyatli yangilandi', type: courses })
  @ApiResponse({ status: 404, description: 'Kurs topilmadi' })
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): Promise<courses> {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Kursni o‘chirish' })
  @ApiParam({ name: 'id', description: 'Kursning UUID identifikatori', type: String })
  @ApiResponse({ status: 204, description: 'Kurs muvaffaqiyatli o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Kurs topilmadi' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.coursesService.remove(id);
  }
}