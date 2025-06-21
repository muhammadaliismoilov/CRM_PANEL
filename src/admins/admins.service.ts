import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { admins } from './admins.model';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin-dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(admins)
    private adminModel: typeof admins,
    private jwtService: JwtService,
  ) {}

  // AccessToken generatsiya qilish
  async generateAccessToken(admin: admins): Promise<string> {
    const payload = { sub: admin.id, login: admin.login, role: admin.role };
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
  }

  // RefreshToken generatsiya qilish
  async generateRefreshToken(admin: admins): Promise<string> {
    const payload = { sub: admin.id, login: admin.login, role: admin.role };
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  // Tokenlarni cookie’ga yozish
  async setTokensToCookies(res: Response, accessToken: string, refreshToken: string): Promise<void> {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, // 15 daqiqa
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 kun
    });
  }

  // Login metodi
  async login(loginAdminDto: LoginAdminDto, res: Response): Promise<{ admin: any; message: string }> {
    try {
      const admin = await this.adminModel.findOne({ where: { login: loginAdminDto.login } });
      if (!admin) {
        throw new UnauthorizedException('Login yoki parol noto‘g‘ri');
      }

      const isPasswordValid = await bcryptjs.compare(loginAdminDto.password, admin.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Login yoki parol noto‘g‘ri');
      }

      const accessToken = await this.generateAccessToken(admin);
      const refreshToken = await this.generateRefreshToken(admin);

      await this.setTokensToCookies(res, accessToken, refreshToken);

      return {
        admin: { id: admin.id, login: admin.login, fullName: admin.fullName, role: admin.role },
        message: 'Muvaffaqiyatli kirish',
      };
    } catch (error) {
      throw new BadRequestException(`Kirishda xatolik: ${error.message}`);
    }
  }

  // Refresh token orqali yangi access token olish
  async refreshToken(refreshToken: string, res: Response): Promise<{ message: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const admin = await this.adminModel.findByPk(payload.sub);

      if (!admin) {
        throw new UnauthorizedException('Noto‘g‘ri refresh token');
      }

      const accessToken = await this.generateAccessToken(admin);
      await this.setTokensToCookies(res, accessToken, refreshToken);

      return { message: 'Access token yangilandi' };
    } catch (error) {
      throw new BadRequestException(`Refresh token xatosi: ${error.message}`);
    }
  }

  async create(createAdminDto: CreateAdminDto): Promise<{ admin: admins; message: string }> {
    try {
      const foundAdmin = await this.adminModel.findOne({ where: { login: createAdminDto.login } });
      if (foundAdmin) {
        throw new BadRequestException(`"${foundAdmin.dataValues.login}" login bilan admin bazada mavjud`);
      }

      const hashedPassword = await bcryptjs.hash(createAdminDto.password, 10);
      const adminData = { ...createAdminDto, password: hashedPassword };

      const admin = await this.adminModel.create(adminData as any);
      return { admin, message: 'Admin muvaffaqiyatli yaratildi' };
    } catch (error) {
      throw new BadRequestException(`Admin yaratishda xatolik: ${error.message}`);
    }
  }

  async findAll(): Promise<admins[]> {
    try {
      return await this.adminModel.findAll();
    } catch (error) {
      throw new BadRequestException(`Adminlarni olishda xatolik: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<{ admin: admins | null; message: string }> {
    try {
      const admin = await this.adminModel.findByPk(id);
      if (!admin) {
        throw new BadRequestException(`Admin topilmadi: ID ${id}`);
      }
      return { admin, message: 'Admin muvaffaqiyatli topildi' };
    } catch (error) {
      throw new BadRequestException(`Bitta adminni olishda xatolik: ${error.message}`);
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<{ admin: admins | null; message: string }> {
    try {
      const admin = await this.adminModel.findByPk(id);
      if (!admin) {
        throw new BadRequestException(`Admin topilmadi: ID ${id}`);
      }
      if (updateAdminDto.password) {
        updateAdminDto.password = await bcryptjs.hash(updateAdminDto.password, 10);
      }
      await admin.update(updateAdminDto as any);
      return { admin, message: 'Admin ma‘lumotlari muvaffaqiyatli yangilandi' };
    } catch (error) {
      throw new BadRequestException(`Admin ma‘lumotlarini yangilashda xatolik: ${error.message}`);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const admin = await this.adminModel.findByPk(id);
      if (!admin) {
        throw new BadRequestException(`Admin topilmadi: ID ${id}`);
      }
      await admin.destroy();
      return { message: 'Admin muvaffaqiyatli o‘chirildi' };
    } catch (error) {
      throw new BadRequestException(`Adminni o‘chirishda xatolik: ${error.message}`);
    }
  }
}