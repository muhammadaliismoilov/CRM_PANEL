import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { course_student } from './courses-student.model';
import { CreateCourseStudentDto } from './dto/create-couses-student.dto';
import { courses } from '../courses/courses.model';
import { students } from '../students/student.model';

@Injectable()
export class CourseStudentService {
  constructor(
    @InjectModel(course_student)
    private courseStudentModel: typeof course_student,
    @InjectModel(courses)
    private courseModel: typeof courses,
    @InjectModel(students)
    private studentModel: typeof students,
  ) {}

  async create(createCourseStudentDto: CreateCourseStudentDto): Promise<course_student> {
    const { studentId, courseId } = createCourseStudentDto;

    // Talaba va kurs mavjudligini tekshirish
    const student = await this.studentModel.findByPk(studentId);
    if (!student) {
      throw new NotFoundException(`ID ${studentId} bo‘yicha talaba topilmadi`);
    }

    const course = await this.courseModel.findByPk(courseId);
    if (!course) {
      throw new NotFoundException(`ID ${courseId} bo‘yicha kurs topilmadi`);
    }

    // Bog‘lanish allaqachon mavjudligini tekshirish
    const existing = await this.courseStudentModel.findOne({ where: { studentId, courseId } });
    if (existing) {
      throw new ConflictException('Bu talaba allaqachon ushbu kursga qo‘shilgan');
    }

    return await this.courseStudentModel.create(createCourseStudentDto as any);
  }

  async findAll(): Promise<course_student[]> {
    return this.courseStudentModel.findAll({
      include: [
        { model: courses, as: 'course' },
        { model: students, as: 'student' },
      ],
    });
  }

  async findByStudent(studentId: string): Promise<course_student[]> {
    const student = await this.studentModel.findByPk(studentId);
    if (!student) {
      throw new NotFoundException(`ID ${studentId} bo‘yicha talaba topilmadi`);
    }

    return this.courseStudentModel.findAll({
      where: { studentId },
      include: [{ model: courses, as: 'course' }],
    });
  }

  async findByCourse(courseId: string): Promise<course_student[]> {
    const course = await this.courseModel.findByPk(courseId);
    if (!course) {
      throw new NotFoundException(`ID ${courseId} bo‘yicha kurs topilmadi`);
    }

    return this.courseStudentModel.findAll({
      where: { courseId },
      include: [{ model: students, as: 'student' }],
    });
  }

  async remove(studentId: string, courseId: string): Promise<void> {
    const courseStudent = await this.courseStudentModel.findOne({
      where: { studentId, courseId },
    });
    if (!courseStudent) {
      throw new NotFoundException('Bu talaba ushbu kursda ro‘yxatdan o‘tmagan');
    }

    await courseStudent.destroy();
  }
}