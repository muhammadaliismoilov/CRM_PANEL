import { Controller, Get, Post, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CourseStudentService } from './couses-student.service'
import { CreateCourseStudentDto } from './dto/create-couses-student.dto';
import { course_student } from './courses-student.model';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/guards/roles.decarator';

@ApiTags('course-student')
@Controller('course-student')
export class CourseStudentController {
  constructor(private readonly courseStudentService: CourseStudentService) {}

  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
    @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Talabani kursga qo‘shish' })
  @ApiResponse({ status: 201, description: 'Talaba kursga muvaffaqiyatli qo‘shildi', type: course_student })
  @ApiResponse({ status: 404, description: 'Talaba yoki kurs topilmadi' })
  @ApiResponse({ status: 409, description: 'Talaba allaqachon kursga qo‘shilgan' })
  @ApiBody({ type: CreateCourseStudentDto })
  async create(@Body() createCourseStudentDto: CreateCourseStudentDto): Promise<course_student> {
    return this.courseStudentService.create(createCourseStudentDto);
  }

  @Get("/getAll")
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Barcha talaba-kurs bog‘lanishlarini olish' })
  @ApiResponse({ status: 200, description: 'Bog‘lanishlar ro‘yxati', type: [course_student] })
  async findAll(): Promise<course_student[]> {
    return this.courseStudentService.findAll();
  }

  @Get('student/:studentId')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Talaba qatnashayotgan kurslarni olish' })
  @ApiParam({ name: 'studentId', description: 'Talabaning UUID identifikatori', type: String })
  @ApiResponse({ status: 200, description: 'Talabaning kurslari', type: [course_student] })
  @ApiResponse({ status: 404, description: 'Talaba topilmadi' })
  async findByStudent(@Param('studentId') studentId: string): Promise<course_student[]> {
    return this.courseStudentService.findByStudent(studentId);
  }

  @Get('course/:courseId')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Kursda qatnashayotgan talabalarni olish' })
  @ApiParam({ name: 'courseId', description: 'Kursning UUID identifikatori', type: String })
  @ApiResponse({ status: 200, description: 'Kurs talabalari', type: [course_student] })
  @ApiResponse({ status: 404, description: 'Kurs topilmadi' })
  async findByCourse(@Param('courseId') courseId: string): Promise<course_student[]> {
    return this.courseStudentService.findByCourse(courseId);
  }

  @Delete(':studentId/:courseId')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Talabani kursdan olib tashlash' })
  @ApiParam({ name: 'studentId', description: 'Talabaning UUID identifikatori', type: String })
  @ApiParam({ name: 'courseId', description: 'Kursning UUID identifikatori', type: String })
  @ApiResponse({ status: 204, description: 'Talaba kursdan muvaffaqiyatli olib tashlandi' })
  @ApiResponse({ status: 404, description: 'Bog‘lanish topilmadi' })
  async remove(@Param('studentId') studentId: string, @Param('courseId') courseId: string): Promise<void> {
    return this.courseStudentService.remove(studentId, courseId);
  }
}