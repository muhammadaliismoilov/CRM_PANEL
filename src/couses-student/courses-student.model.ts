import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { courses } from '../courses/courses.model';
import { students } from '../students/student.model';

@Table({ tableName: 'course_student' })
export class course_student extends Model {
  @ForeignKey(() => students)
  @Column({ type: DataType.UUID, allowNull: false })
  studentId: string;

  @ForeignKey(() => courses)
  @Column({ type: DataType.UUID, allowNull: false })
  courseId: string;
}