import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto} from './dto/update-teacher.dto';
import { teachers } from './teachers.model';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/guards/roles.decarator';

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
      @Roles('admin', 'superadmin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Yangi o‘qituvchi yaratish' })
  @ApiResponse({ status: 201, description: 'O‘qituvchi muvaffaqiyatli yaratildi', type: teachers })
  @ApiResponse({ status: 409, description: 'Login allaqachon ishlatilgan' })
  @ApiBody({ type: CreateTeacherDto })
  async create(@Body() createTeacherDto: CreateTeacherDto): Promise<teachers> {
    return this.teachersService.create(createTeacherDto);
  }

  @Get("/getAll")
  @UseGuards(JwtAuthGuard)
    @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Barcha o‘qituvchilarni olish' })
  @ApiResponse({ status: 200, description: 'O‘qituvchilar ro‘yxati', type: [teachers] })
  async findAll(): Promise<teachers[]> {
    return this.teachersService.findAll();
  }

  @Get('/getOne/:id')
  @UseGuards(JwtAuthGuard)
    @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'ID bo‘yicha o‘qituvchini olish' })
  @ApiParam({ name: 'id', description: 'O‘qituvchining UUID identifikatori', type: String })
  @ApiResponse({ status: 200, description: 'O‘qituvchi ma‘lumotlari', type: teachers })
  @ApiResponse({ status: 404, description: 'O‘qituvchi topilmadi' })
  async findOne(@Param('id') id: string): Promise<teachers> {
    return this.teachersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
    @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'O‘qituvchi ma‘lumotlarini yangilash' })
  @ApiParam({ name: 'id', description: 'O‘qituvchining UUID identifikatori', type: String })
  @ApiBody({ type: UpdateTeacherDto })
  @ApiResponse({ status: 200, description: 'O‘qituvchi muvaffaqiyatli yangilandi', type: teachers })
  @ApiResponse({ status: 404, description: 'O‘qituvchi topilmadi' })
  @ApiResponse({ status: 409, description: 'Login allaqachon ishlatilgan' })
  async update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto): Promise<teachers> {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
    @Roles('admin', 'superadmin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'O‘qituvchini o‘chirish' })
  @ApiParam({ name: 'id', description: 'O‘qituvchining UUID identifikatori', type: String })
  @ApiResponse({ status: 204, description: 'O‘qituvchi muvaffaqiyatli o‘chirildi' })
  @ApiResponse({ status: 404, description: 'O‘qituvchi topilmadi' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.teachersService.remove(id);
  }
}