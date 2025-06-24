import { Table, Column, Model, DataType, PrimaryKey, Default, HasMany, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { students } from '../students/student.model';
import { teachers } from '../teachers/teachers.model';
import { payments } from '../payment/payment.model';
import { attendances } from '../attendance/attendance.model';
import { course_student } from '../couses-student/courses-student.model';

@Table({ tableName: 'courses' })
export class courses extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({ type: DataType.UUID, allowNull: false })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  courseName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lessonDays: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  lessonTime: string;

  @ForeignKey(() => teachers)
  @Column({ type: DataType.UUID, allowNull: false })
  teacherId: string;

  @BelongsTo(() => teachers, 'teacherId')
  teacher: teachers;

  @BelongsToMany(() => students, () => course_student)
  students: students[];

  @HasMany(() => attendances)
  attendances: attendances[];

  @HasMany(() => payments)
  payments: payments[];

  @CreatedAt
  @Column({ type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  declare updatedAt: Date;
}