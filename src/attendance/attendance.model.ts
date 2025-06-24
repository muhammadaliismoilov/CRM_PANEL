import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { students } from '../students/student.model';
import { courses } from '../courses/courses.model';

@Table({ tableName: 'attendances' })
export class attendances extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({ type: DataType.UUID, allowNull: false })
  declare id: string;

  @ForeignKey(() => students)
  @Column({ type: DataType.UUID, allowNull: false })
  studentId: string;

  @ForeignKey(() => courses)
  @Column({ type: DataType.UUID, allowNull: false })
  courseId: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  present: boolean;

  @CreatedAt
  @Column({ type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  declare updatedAt: Date;

  @BelongsTo(() => students)
  student: students;

  @BelongsTo(() => courses)
  course: courses;
}