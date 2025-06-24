import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { teachers } from './teachers.model';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import{ UpdateTeacherDto } from './dto/update-teacher.dto'
import { courses } from '../courses/courses.model';
import { payments } from '../payment/payment.model';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(teachers)
    private teacherModel: typeof teachers,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<teachers> {
    try {
      return await this.teacherModel.create(createTeacherDto as any);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Bu login allaqachon ishlatilgan');
      }
      throw error;
    }
  }

  async findAll(): Promise<teachers[]> {
    return this.teacherModel.findAll({
      include: [
        { model: courses, as: 'courses' },
        { model: payments, as: 'payments' },
      ],
    });
  }

  async findOne(id: string): Promise<teachers> {
    const teacher = await this.teacherModel.findByPk(id, {
      include: [
        { model: courses, as: 'courses' },
        { model: payments, as: 'payments' },
      ],
    });
    if (!teacher) {
      throw new NotFoundException(`ID ${id} bo‘yicha o‘qituvchi topilmadi`);
    }
    return teacher;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<teachers> {
    const teacher = await this.findOne(id);
    try {
      return await teacher.update(updateTeacherDto);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Bu login allaqachon ishlatilgan');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const teacher = await this.findOne(id);
    await teacher.destroy();
  }
}