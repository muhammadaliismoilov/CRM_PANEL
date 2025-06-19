import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { student } from '../models/student.model';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(student)
    private studentModel: typeof student,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<student> {
    return this.studentModel.create(createStudentDto as any);
  }

  async findAll(): Promise<student[]> {
    return this.studentModel.findAll();
  }

  async findOne(id: number): Promise<student | null> {
    return this.studentModel.findByPk(id);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<student | null> {
    const student = await this.studentModel.findByPk(id);
    if (student) {
      await student.update(updateStudentDto as any);
      return student;
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    const student = await this.studentModel.findByPk(id);
    if (student) {
      await student.destroy();
    }
  }
}