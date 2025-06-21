import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { courses } from './courses.model';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(courses)
    private coursesModel: typeof courses,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<{ course: courses; message: string }> {
    try {
      const foundCourse = await this.coursesModel.findOne({ where: { courseName: createCourseDto.courseName } });
      
      if (foundCourse) {
        throw new BadRequestException(`"${foundCourse.dataValues.courseName}" nomli kurs bazada mavjud`);
      }
      
      const course = await this.coursesModel.create(createCourseDto as any);
      return { course, message: 'Kurs muvaffaqiyatli yaratildi' };
    } catch (error) {
      throw new BadRequestException(`Kurs yaratishda xatolik: ${error.message}`);
    }
  }

  async findAll(): Promise<courses[]> {
    try {
      return await this.coursesModel.findAll();
    } catch (error) {
      throw new BadRequestException(`Kurslarni olishda xatolik: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<{ course: courses | null; message: string }> {
    try {
      const course = await this.coursesModel.findByPk(id);
      if (!course) {
        throw new BadRequestException(`Kurs topilmadi: ID ${id}`);
      }
      return { course, message: 'Kurs muvaffaqiyatli topildi' };
    } catch (error) {
      throw new BadRequestException(`Bitta kursni olishda xatolik: ${error.message}`);
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<{ course: courses | null; message: string }> {
    try {
      const course = await this.coursesModel.findByPk(id);
      if (!course) {
        throw new BadRequestException(`Kurs topilmadi: ID ${id}`);
      }
      await course.update(updateCourseDto as any);
      return { course, message: 'Kurs muvaffaqiyatli yangilandi' };
    } catch (error) {
      throw new BadRequestException(`Kurs ma'lumotlarini yangilashda xatolik: ${error.message}`);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const course = await this.coursesModel.findByPk(id);
      if (!course) {
        throw new BadRequestException(`Kurs topilmadi: ID ${id}`);
      }
      await course.destroy();
      return { message: 'Kurs muvaffaqiyatli o‘chirildi' };
    } catch (error) {
      throw new BadRequestException(`Kursni o‘chirishda xatolik: ${error.message}`);
    }
  }
}