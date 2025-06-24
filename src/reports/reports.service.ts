import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { students } from '../students/student.model';
import { teachers } from '../teachers/teachers.model';
import { courses } from '../courses/courses.model';
import { attendances } from '../attendance/attendance.model';
import { Op } from 'sequelize';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(students) private studentsModel: typeof students,
    @InjectModel(teachers) private teachersModel: typeof teachers,
    @InjectModel(courses) private coursesModel: typeof courses,
    @InjectModel(attendances) private attendancesModel: typeof attendances,
  ) {}

  async getAll() {
    const currentMonth = new Date().getMonth() + 1; // Joriy oy (1-12)
    const currentYear = new Date().getFullYear(); // Joriy yil

    // Jami studentlar soni
    const totalStudents = await this.studentsModel.count();

    // Jami o'qituvchilar soni
    const totalTeachers = await this.teachersModel.count();

    // Jami guruhlar soni
    const totalCourses = await this.coursesModel.count();

    // Shu oyda guruhni tark etgan studentlar soni
    const droppedStudentsThisMonth = await this.attendancesModel.count({
      where: {
        present: false,
        createdAt: {
          [Op.gte]: new Date(currentYear, currentMonth - 1, 1),
          [Op.lt]: new Date(currentYear, currentMonth, 1),
        },
      },
      distinct: true,
      col: 'studentId',
    });

    return {
      totalStudents,
      totalTeachers,
      totalCourses,
      droppedStudentsThisMonth,
    };
  }

  async getChart() {
    const currentDate = new Date(); // 2025-06-24 15:20
    const currentYear = currentDate.getFullYear();
    const chartData: { month: string; enrolled: number; dropped: number }[] = [];

    // Oxirgi 12 oy uchun tsikl
    for (let month = 0; month < 12; month++) {
      const targetMonth = currentDate.getMonth() - month; // Joriy oy’dan orqaga 12 oy
      const targetYear = currentYear - Math.floor(month / 12); // Yilni moslashtirish
      const adjustedMonth = (targetMonth % 12 + 12) % 12; // Modul operator bilan aylanishni ta'minlash

      // Oy boshidan keyingi sana
      const startDate = new Date(targetYear, adjustedMonth, 1);
      const endDate = new Date(targetYear, adjustedMonth + 1, 0, 23, 59, 59); // Oy oxiri

      // Yangi qo‘shilgan studentlar soni (createdAt bo‘yicha)
      const enrolledStudents = await this.studentsModel.count({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      // Tark etgan studentlar soni (attendances.present: false bo‘yicha)
      const droppedStudents = await this.attendancesModel.count({
        where: {
          present: false,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        distinct: true,
        col: 'studentId',
      });

      // Oy nomini qo‘shish (masalan, "Jun 2024")
      const monthName = startDate.toLocaleString('en-US', { month: 'short', year: 'numeric' });
      chartData.unshift({ month: monthName, enrolled: enrolledStudents, dropped: droppedStudents }); // Eskiroq oylardan yangi oylarga qarab
    }

    return chartData;
  }
}