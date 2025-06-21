import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { teachers } from './teachers.model';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post("/create")
  async create(@Body() createTeacherDto: CreateTeacherDto): Promise<{ teacher: teachers; message: string }> {
    return await this.teachersService.create(createTeacherDto);
  }

  @Get("/getAll")
  async findAll(): Promise<teachers[]> {
    return await this.teachersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ teacher: teachers | null; message: string }> {
    return await this.teachersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<{ teacher: teachers | null; message: string }> {
    return await this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return await this.teachersService.delete(id);
  }
}