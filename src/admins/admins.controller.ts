import { Controller, Post, Body, Get, Param, Patch, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin-dto';
import { admins } from './admins.model';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post("/create")
  async create(@Body() createAdminDto: CreateAdminDto): Promise<{ admin: admins; message: string }> {
    return await this.adminsService.create(createAdminDto);
  }

  @Post('login')
  async login(@Body() loginAdminDto: LoginAdminDto, @Res({ passthrough: true }) res: Response): Promise<{ admin: any; message: string }> {
    return await this.adminsService.login(loginAdminDto, res);
  }

  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string, @Res({ passthrough: true }) res: Response): Promise<{ message: string }> {
    return await this.adminsService.refreshToken(refreshToken, res);
  }

  @Get("/getAll")
  async findAll(): Promise<admins[]> {
    return await this.adminsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ admin: admins | null; message: string }> {
    return await this.adminsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<{ admin: admins | null; message: string }> {
    return await this.adminsService.update(id, updateAdminDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return await this.adminsService.delete(id);
  }
}