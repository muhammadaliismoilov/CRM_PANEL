import { Table, Column, Model, DataType, PrimaryKey, Default, CreatedAt, UpdatedAt, HasMany, BelongsToMany } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { courses } from '../courses/courses.model';
import { payments } from '../payment/payment.model';
import { attendances } from '../attendance/attendance.model';
import { course_student } from '../couses-student/courses-student.model';

export enum Role {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

@Table({ tableName: 'students' })
export class students extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({ type: DataType.UUID, allowNull: false })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  phoneNumber: string;

  @Column({ type: DataType.STRING, allowNull: false })
  parentName: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  parentPhoneNumber: string;

  @Column({ type: DataType.STRING, allowNull: true })
  img?: string;

  @Column({ type: DataType.ENUM(...Object.values(Role)), allowNull: true, defaultValue: Role.STUDENT })
  role: Role;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isPaid: boolean;

  @BelongsToMany(() => courses, () => course_student)
  courses: courses[];

  @HasMany(() => payments)
  payments: payments[];

  @HasMany(() => attendances)
  attendances: attendances[];

  @CreatedAt
  @Column({ type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  declare updatedAt: Date;
}