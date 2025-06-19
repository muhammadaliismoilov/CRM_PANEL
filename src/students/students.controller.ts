import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { StudentService } from './students.service';
import { student } from '../models/student.model';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post("/create")
  async create(@Body() createStudentDto: CreateStudentDto): Promise<student> {
    return this.studentService.create(createStudentDto);
  }

  @Get("/getAll")
  async findAll(): Promise<student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<student | null> {
    return this.studentService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<student | null> {
    return this.studentService.update(Number(id), updateStudentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.studentService.delete(Number(id));
  }
}