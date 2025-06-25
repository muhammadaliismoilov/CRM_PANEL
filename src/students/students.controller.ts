import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { StudentsService } from './students.service';
import { students } from './student.model';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get("/getAll")
  @ApiOperation({ summary: 'Get all students with pagination' })
  @ApiQuery({ name: 'page', required: false, type: 'number', description: 'Page number (default: 1)' })
  @ApiResponse({ status: 200, description: 'List of students', schema: { example: { data: [{ id: 'uuid', name: 'Ali', login: 'ali_student', phoneNumber: '+998901234567', parentName: 'Vali', parentPhoneNumber: '+998912345678', role: 'student', isPaid: false, createdAt: '2025-06-25T10:28:00Z', updatedAt: '2025-06-25T10:28:00Z' }], meta: { currentPage: 1, totalPages: 3, totalItems: 11, itemsPerPage: 5, hasPrevious: false, hasNext: true } } } })
  @ApiResponse({ status: 404, description: 'No students found' })
  async findAll(
    @Query('page') page: number = 1
  ): Promise<{ data: students[]; meta: { currentPage: number; totalPages: number; totalItems: number; itemsPerPage: number; hasPrevious: boolean; hasNext: boolean } }> {
    return this.studentsService.findAll({ page, limit: 5 });
  }

  @Get('/getOne:id')
  @ApiOperation({ summary: 'Get student by ID' })
  @ApiParam({ name: 'id', description: 'Student UUID', type: String })
  @ApiResponse({ status: 200, description: 'Student details', type: students })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async findOne(@Param('id') id: string): Promise<students> {
    return this.studentsService.findOne(id);
  }

  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new student' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: 201, description: 'Student created', type: students })
  @ApiResponse({ status: 409, description: 'Login already exists' })
  async create(@Body() createStudentDto: CreateStudentDto): Promise<students> {
    return this.studentsService.create(createStudentDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student by ID' })
  @ApiParam({ name: 'id', description: 'Student UUID', type: String })
  @ApiBody({ type: UpdateStudentDto })
  @ApiResponse({ status: 200, description: 'Student updated', type: students })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 409, description: 'Login already exists' })
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<students> {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete student by ID' })
  @ApiParam({ name: 'id', description: 'Student UUID', type: String })
  @ApiResponse({ status: 204, description: 'Student deleted' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.studentsService.remove(id);
  }
}