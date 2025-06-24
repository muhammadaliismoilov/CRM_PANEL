import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { payments } from './payment.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import{UpdatePaymentDto} from './dto/update-payment.dto'
import { students } from '../students/student.model';
import { courses } from '../courses/courses.model';
import { teachers } from '../teachers/teachers.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(payments)
    private paymentModel: typeof payments,
    @InjectModel(students)
    private studentModel: typeof students,
    @InjectModel(courses)
    private courseModel: typeof courses,
    @InjectModel(teachers)
    private teacherModel: typeof teachers,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<payments> {
    const { studentId, courseId, teacherId } = createPaymentDto;

    // Talaba, kurs va o‘qituvchi mavjudligini tekshirish
    const student = await this.studentModel.findByPk(studentId);
    if (!student) {
      throw new NotFoundException(`ID ${studentId} bo‘yicha talaba topilmadi`);
    }

    const course = await this.courseModel.findByPk(courseId);
    if (!course) {
      throw new NotFoundException(`ID ${courseId} bo‘yicha kurs topilmadi`);
    }

    const teacher = await this.teacherModel.findByPk(teacherId);
    if (!teacher) {
      throw new NotFoundException(`ID ${teacherId} bo‘yicha o‘qituvchi topilmadi`);
    }

    return await this.paymentModel.create(createPaymentDto as any);
  }

  async findAll(): Promise<payments[]> {
    return this.paymentModel.findAll({
      include: [
        { model: students, as: 'student' },
        { model: courses, as: 'course' },
        { model: teachers, as: 'teacher' },
      ],
    });
  }

  async findOne(id: string): Promise<payments> {
    const payment = await this.paymentModel.findByPk(id, {
      include: [
        { model: students, as: 'student' },
        { model: courses, as: 'course' },
        { model: teachers, as: 'teacher' },
      ],
    });
    if (!payment) {
      throw new NotFoundException(`ID ${id} bo‘yicha to‘lov topilmadi`);
    }
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<payments> {
    const payment = await this.findOne(id);

    // Yangi ID’lar mavjudligini tekshirish
    if (updatePaymentDto.studentId) {
      const student = await this.studentModel.findByPk(updatePaymentDto.studentId);
      if (!student) {
        throw new NotFoundException(`ID ${updatePaymentDto.studentId} bo‘yicha talaba topilmadi`);
      }
    }

    if (updatePaymentDto.courseId) {
      const course = await this.courseModel.findByPk(updatePaymentDto.courseId);
      if (!course) {
        throw new NotFoundException(`ID ${updatePaymentDto.courseId} bo‘yicha kurs topilmadi`);
      }
    }

    if (updatePaymentDto.teacherId) {
      const teacher = await this.teacherModel.findByPk(updatePaymentDto.teacherId);
      if (!teacher) {
        throw new NotFoundException(`ID ${updatePaymentDto.teacherId} bo‘yicha o‘qituvchi topilmadi`);
      }
    }

    return await payment.update(updatePaymentDto);
  }

  async remove(id: string): Promise<void> {
    const payment = await this.findOne(id);
    await payment.destroy();
  }
}