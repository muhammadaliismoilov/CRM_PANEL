import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { attendances } from './attendance.model';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { students } from '../students/student.model';
import { courses } from '../courses/courses.model';

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
    if(student && course){
      throw new BadRequestException("Siz yo`lamadan o`tgansiz")
    }
    return await this.attendanceModel.create(createAttendanceDto as any);
  }

  async findAll(): Promise<attendances[]> {
    return this.attendanceModel.findAll({
      include: [
        { model: students, as: 'student' },
        { model: courses, as: 'course' },
      ],
    });
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