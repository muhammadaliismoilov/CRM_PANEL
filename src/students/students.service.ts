import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { student } from './student.model';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(student)
    private studentModel: typeof student,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<{ student: student; message: string }> {
    try {
      const foundStudent = await this.studentModel.findOne({ where: { login: createStudentDto.login } });
      if (foundStudent) {
        throw new BadRequestException(`"${foundStudent.dataValues.login}" login bilan talaba bazada mavjud`);
      }

      const student = await this.studentModel.create(createStudentDto as any);
      return { student, message: 'Talaba muvaffaqiyatli yaratildi' };
    } catch (error) {
      throw new BadRequestException(`Talaba yaratishda xatolik: ${error.message}`);
    }
  }

  async findAll(): Promise<student[]> {
    try {
      return await this.studentModel.findAll();
    } catch (error) {
      throw new BadRequestException(`Talabalarni olishda xatolik: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<{ student: student | null; message: string }> {
    try {
      const student = await this.studentModel.findByPk(id);
      if (!student) {
        throw new BadRequestException(`Talaba topilmadi: ID ${id}`);
      }
      return { student, message: 'Talaba muvaffaqiyatli topildi' };
    } catch (error) {
      throw new BadRequestException(`Bitta talabani olishda xatolik: ${error.message}`);
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<{ student: student | null; message: string }> {
    try {
      const student = await this.studentModel.findByPk(id);
      if (!student) {
        throw new BadRequestException(`Talaba topilmadi: ID ${id}`);
      }
      await student.update(updateStudentDto as any);
      return { student, message: 'Talaba ma\'lumotlari muvaffaqiyatli yangilandi' };
    } catch (error) {
      throw new BadRequestException(`Talaba ma\'lumotlarini yangilashda xatolik: ${error.message}`);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      const student = await this.studentModel.findByPk(id);
      if (!student) {
        throw new BadRequestException(`Talaba topilmadi: ID ${id}`);
      }
      await student.destroy();
      return { message: 'Talaba muvaffaqiyatli o‘chirildi' };
    } catch (error) {
      throw new BadRequestException(`Talabani o‘chirishda xatolik: ${error.message}`);
    }
  }
}