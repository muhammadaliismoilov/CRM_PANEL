import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AdminService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { admins } from './admins.model';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Roles } from 'src/guards/roles.decarator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Yangi admin qo‘shish' })
  @ApiResponse({ status: 201, description: 'Admin muvaffaqiyatli qo‘shildi', type: admins })
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  @ApiBody({ type: CreateAdminDto })
  async create(@Body() createAdminDto: CreateAdminDto): Promise<admins> {
    return this.adminService.create(createAdminDto);
  }

  @Get("/getAll")
  @ApiOperation({ summary: 'Barcha adminlarni olish' })
  @ApiResponse({ status: 200, description: 'Adminlar ro‘yxati', type: [admins] })
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  async findAll(): Promise<admins[]> {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha adminni olish' })
  @ApiParam({ name: 'id', description: 'Adminning UUID identifikatori', type: String })
  @ApiResponse({ status: 200, description: 'Admin ma‘lumotlari', type: admins })
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  @ApiResponse({ status: 404, description: 'Admin topilmadi' })
  async findOne(@Param('id') id: string): Promise<admins> {
    return this.adminService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Admin ma‘lumotlarini yangilash' })
  @ApiParam({ name: 'id', description: 'Adminning UUID identifikatori', type: String })
  @ApiBody({ type: UpdateAdminDto })
  @ApiResponse({ status: 200, description: 'Admin muvaffaqiyatli yangilandi', type: admins })
  @UseGuards(JwtAuthGuard)
  @Roles( 'superadmin')
  @ApiResponse({ status: 404, description: 'Admin topilmadi' })
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto): Promise<admins> {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Adminni o‘chirish' })
  @ApiParam({ name: 'id', description: 'Adminning UUID identifikatori', type: String })
  @UseGuards(JwtAuthGuard)
  @Roles( 'superadmin')
  @ApiResponse({ status: 204, description: 'Admin muvaffaqiyatli o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Admin topilmadi' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.adminService.remove(id);
  }
}