import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { students } from '../students/student.model';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { courses } from '../courses/courses.model';
import { payments } from '../payment/payment.model';
import { attendances } from '../attendance/attendance.model';
import * as bcrypt from 'bcrypt';

interface PaginationOptions {
  page: number;
  limit: number;
}

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(students)
    private studentModel: typeof students,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<students> {
    try {
      createStudentDto.password = await bcrypt.hash(createStudentDto.password, 10);
      return await this.studentModel.create(createStudentDto as any);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Bu login allaqachon ishlatilgan');
      }
      throw error;
    }
  }

  async findAll({ page = 1, limit = 5 }: PaginationOptions) {
    const offset = (page - 1) * limit;
    const students = await this.studentModel.findAndCountAll({
      limit,
      offset,
      include: [
        { model: courses, as: 'courses' },
        { model: payments, as: 'payments' },
        { model: attendances, as: 'attendances' },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (!students.rows.length) {
      throw new NotFoundException('No students found');
    }

    const totalPages = Math.ceil(students.count / limit);
    const hasPrevious = page > 1;
    const hasNext = page < totalPages;

    const meta: PaginationMeta = {
      currentPage: page,
      totalPages,
      totalItems: students.count,
      itemsPerPage: limit,
      hasPrevious,
      hasNext,
    };

    return {
      data: students.rows,
      meta,
    };
  }

  async findOne(id: string): Promise<students> {
    const student = await this.studentModel.findByPk(id, {
      include: [
        { model: courses, as: 'courses' },
        { model: payments, as: 'payments' },
        { model: attendances, as: 'attendances' },
      ],
    });
    if (!student) {
      throw new NotFoundException(`ID ${id} bo‘yicha talaba topilmadi`);
    }
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<students> {
    const student = await this.findOne(id);
    try {
      if (updateStudentDto.password) {
        updateStudentDto.password = await bcrypt.hash(updateStudentDto.password, 10);
      }
      return await student.update(updateStudentDto);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Bu login allaqachon ishlatilgan');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const student = await this.findOne(id);
    await student.destroy();
  }
}