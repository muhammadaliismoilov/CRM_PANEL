import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { teachers } from '../teachers/teachers.model';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { LoginTeacherDto } from './dto/login-teacher.dto';
import * as bcryptjs from 'bcryptjs';
import bcrypt from 'bcryptjs';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(teachers)
    private teacherModel: typeof teachers,
    private jwtService: JwtService,
  ) {}

  // AccessToken generatsiya qilish
  async generateAccessToken(teacher: teachers): Promise<string> {
    const payload = { sub: teacher.id, login: teacher.login, role: teacher.role };
    return this.jwtService.signAsync(payload, { expiresIn: '15m' }); // 15 daqiqa muddat
  }

  // RefreshToken generatsiya qilish
  async generateRefreshToken(teacher: teachers): Promise<string> {
    const payload = { sub: teacher.id, login: teacher.login, role: teacher.role };
    return this.jwtService.signAsync(payload, { expiresIn: '7d' }); // 7 kun muddat
  }

  // Login metodi
  async login(loginTeacherDto: LoginTeacherDto): Promise<{ accessToken: string; refreshToken: string; teacher: teachers; message: string }> {
    try {
      const teacher = await this.teacherModel.findOne({ where: { login: loginTeacherDto.login } });
      if (!teacher) {
        throw new UnauthorizedException('Login yoki parol noto‘g‘ri');
      }

      const isPasswordValid = await bcryptjs.compare(loginTeacherDto.parol, teacher.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Login yoki parol noto‘g‘ri');
      }

      const accessToken = await this.generateAccessToken(teacher);
      const refreshToken = await this.generateRefreshToken(teacher);

      return {
        accessToken,
        refreshToken,
        teacher,
        message: 'Muvaffaqiyatli kirish',
      };
    } catch (error) {
      throw new BadRequestException(`Kirishda xatolik: ${error.message}`);
    }
  }

  // Refresh token orqali yangi access token olish
  async refreshToken(refreshToken: string): Promise<{ accessToken: string; message: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const teacher = await this.teacherModel.findByPk(payload.sub);

      if (!teacher) {
        throw new UnauthorizedException('Noto‘g‘ri refresh token');
      }

      const accessToken = await this.generateAccessToken(teacher);
      return { accessToken, message: 'Access token yangilandi' };
    } catch (error) {
      throw new BadRequestException(`Refresh token xatosi: ${error.message}`);
    }
  }

  async create(createTeacherDto: CreateTeacherDto): Promise<{ teacher: teachers; message: string }> {
    try {
      const foundTeacher = await this.teacherModel.findOne({ where: { login: createTeacherDto.login } });
      if (foundTeacher) {
        throw new BadRequestException(`"${foundTeacher.dataValues.login}" login bilan o‘qituvchi bazada mavjud`);
      }

      const hashedPassword = await bcryptjs.hash(createTeacherDto.password, 10);
      const teacherData = { ...createTeacherDto, parol: hashedPassword };

      const teacher = await this.teacherModel.create(teacherData as any);
      return { teacher, message: 'O‘qituvchi muvaffaqiyatli yaratildi' };
    } catch (error) {
      throw new BadRequestException(`O‘qituvchi yaratishda xatolik: ${error.message}`);
    }
  }

  async findAll(): Promise<teachers[]> {
    try {
      return await this.teacherModel.findAll();
    } catch (error) {
      throw new BadRequestException(`O‘qituvchilarni olishda xatolik: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<{ teacher: teachers | null; message: string }> {
    try {
      const teacher = await this.teacherModel.findByPk(id);
      if (!teacher) {
        throw new BadRequestException(`O‘qituvchi topilmadi: ID ${id}`);
      }
      return { teacher, message: 'O‘qituvchi muvaffaqiyatli topildi' };
    } catch (error) {
      throw new BadRequestException(`Bitta o‘qituvchini olishda xatolik: ${error.message}`);
    }
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<{ teacher: teachers | null; message: string }> {
    try {
      const teacher = await this.teacherModel.findByPk(id);
      if (!teacher) {
        throw new BadRequestException(`O‘qituvchi topilmadi: ID ${id}`);
      }
      if (updateTeacherDto.password) {
        updateTeacherDto.password = await bcrypt.hash(updateTeacherDto.password, 10);
      }
      await teacher.update(updateTeacherDto as any);
      return { teacher, message: 'O‘qituvchi ma‘lumotlari muvaffaqiyatli yangilandi' };
    } catch (error) {
      throw new BadRequestException(`O‘qituvchi ma‘lumotlarini yangilashda xatolik: ${error.message}`);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const teacher = await this.teacherModel.findByPk(id);
      if (!teacher) {
        throw new BadRequestException(`O‘qituvchi topilmadi: ID ${id}`);
      }
      await teacher.destroy();
      return { message: 'O‘qituvchi muvaffaqiyatli o‘chirildi' };
    } catch (error) {
      throw new BadRequestException(`O‘qituvchini o‘chirishda xatolik: ${error.message}`);
    }
  }
}