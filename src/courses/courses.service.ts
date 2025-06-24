import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { courses } from './courses.model';
import { CreateCourseDto} from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { students } from '../students/student.model';
import { teachers } from '../teachers/teachers.model';
import { payments } from '../payment/payment.model';
import { attendances } from '../attendance/attendance.model';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(courses)
    private courseModel: typeof courses,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<courses> {
    return await this.courseModel.create(createCourseDto as any);
  }

  async findAll(): Promise<courses[]> {
    return this.courseModel.findAll({
      include: [
        { model: teachers, as: 'teacher' },
        { model: students, as: 'students' },
        { model: payments, as: 'payments' },
        { model: attendances, as: 'attendances' },
      ],
    });
  }

  async findOne(id: string): Promise<courses> {
    const course = await this.courseModel.findByPk(id, {
      include: [
        { model: teachers, as: 'teacher' },
        { model: students, as: 'students' },
        { model: payments, as: 'payments' },
        { model: attendances, as: 'attendances' },
      ],
    });
    if (!course) {
      throw new NotFoundException(`ID ${id} bo‘yicha kurs topilmadi`);
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<courses> {
    const course = await this.findOne(id);
    return await course.update(updateCourseDto);
  }

  async remove(id: string): Promise<void> {
    const course = await this.findOne(id);
    await course.destroy();
  }
}