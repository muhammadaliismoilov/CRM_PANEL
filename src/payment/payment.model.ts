import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { students } from '../students/student.model';
import { courses } from '../courses/courses.model';
import { teachers } from '../teachers/teachers.model';

@Table({ tableName: 'payments' })
export class payments extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({ type: DataType.UUID, allowNull: false })
  declare id: string;

  @ForeignKey(() => students)
  @Column({ type: DataType.UUID, allowNull: false })
  studentId: string;

  @BelongsTo(() => students)
  student: students;

  @ForeignKey(() => courses)
  @Column({ type: DataType.UUID, allowNull: false })
  courseId: string;

  @BelongsTo(() => courses)
  course: courses;

  @ForeignKey(() => teachers)
  @Column({ type: DataType.UUID, allowNull: false })
  teacherId: string;

  @BelongsTo(() => teachers)
  teacher: teachers;

  @Column({ type: DataType.STRING(50), allowNull: false })
  studentPhoneNumber: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  declare updatedAt: Date;
}