import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { courses } from '../models/courses.model';
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

  async create(createCourseDto: CreateCourseDto): Promise<courses> {
    return this.coursesModel.create(createCourseDto as any);
  }

  async findAll(): Promise<courses[]> {
    return this.coursesModel.findAll();
  }

  async findOne(id: string): Promise<courses | null> {
    return this.coursesModel.findByPk(id);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<courses | null> {
    const course = await this.coursesModel.findByPk(id);
    if (course) {
      await course.update(updateCourseDto as any);
      return course;
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const course = await this.coursesModel.findByPk(id);
    if (course) {
      await course.destroy();
    }
  }
}