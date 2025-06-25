import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { attendances } from './attendance.model';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { students } from '../students/student.model';
import { courses } from '../courses/courses.model';

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
export class AttendanceService {
  constructor(
    @InjectModel(attendances)
    private attendanceModel: typeof attendances,
    @InjectModel(students)
    private studentModel: typeof students,
    @InjectModel(courses)
    private courseModel: typeof courses,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<attendances> {
    const { studentId, courseId } = createAttendanceDto;

    // Talaba va kurs mavjudligini tekshirish
    const student = await this.studentModel.findByPk(studentId);
    if (!student) {
      throw new NotFoundException(`ID ${studentId} bo‘yicha talaba topilmadi`);
    }

    const course = await this.courseModel.findByPk(courseId);
    if (!course) {
      throw new NotFoundException(`ID ${courseId} bo‘yicha kurs topilmadi`);
    }

    // Agar talaba allaqachon ushbu kurs uchun davomat qayd etgan bo‘lsa, xatolik qaytarish
    const existingAttendance = await this.attendanceModel.findOne({ where: { studentId, courseId } });
    if (existingAttendance) {
      throw new BadRequestException('Siz ushbu kurs uchun allaqachon davomat qayd etgansiz');
    }

    return await this.attendanceModel.create(createAttendanceDto as any);
  }

  async findAll({ page = 1, limit = 5 }: PaginationOptions) {
    const offset = (page - 1) * limit;
    const attendances = await this.attendanceModel.findAndCountAll({
      limit,
      offset,
      include: [
        { model: students, as: 'student' },
        { model: courses, as: 'course' },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (!attendances.rows.length) {
      throw new NotFoundException('No attendances found');
    }

    const totalPages = Math.ceil(attendances.count / limit);
    const hasPrevious = page > 1;
    const hasNext = page < totalPages;

    const meta: PaginationMeta = {
      currentPage: page,
      totalPages,
      totalItems: attendances.count,
      itemsPerPage: limit,
      hasPrevious,
      hasNext,
    };

    return {
      data: attendances.rows,
      meta,
    };
  }

  async findOne(id: string): Promise<attendances> {
    const attendance = await this.attendanceModel.findByPk(id, {
      include: [
        { model: students, as: 'student' },
        { model: courses, as: 'course' },
      ],
    });
    if (!attendance) {
      throw new NotFoundException(`ID ${id} bo‘yicha davomat topilmadi`);
    }
    return attendance;
  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<attendances> {
    const attendance = await this.findOne(id);

    // Yangi ID’lar mavjudligini tekshirish
    if (updateAttendanceDto.studentId) {
      const student = await this.studentModel.findByPk(updateAttendanceDto.studentId);
      if (!student) {
        throw new NotFoundException(`ID ${updateAttendanceDto.studentId} bo‘yicha talaba topilmadi`);
      }
    }

    if (updateAttendanceDto.courseId) {
      const course = await this.courseModel.findByPk(updateAttendanceDto.courseId);
      if (!course) {
        throw new NotFoundException(`ID ${updateAttendanceDto.courseId} bo‘yicha kurs topilmadi`);
      }
    }

    return await attendance.update(updateAttendanceDto);
  }

  async remove(id: string): Promise<void> {
    const attendance = await this.findOne(id);
    await attendance.destroy();
  }
}