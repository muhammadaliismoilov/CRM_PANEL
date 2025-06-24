

import { Table, Column, Model, DataType, PrimaryKey, Default, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { courses } from '../courses/courses.model';
import { payments } from '../payment/payment.model';

export enum Role {
    STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

@Table({ tableName: 'teachers' })
export class teachers extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({ type: DataType.UUID, allowNull: false })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  fullName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phoneNumber: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.ENUM(...Object.values(Role)), allowNull: true, defaultValue: Role.TEACHER })
  role: Role;

  @Column({ type: DataType.STRING, allowNull: true })
  img?: string;

  @HasMany(() => courses)
  courses: courses[];

  @HasMany(() => payments)
  payments: payments[];

  @CreatedAt
  @Column({ type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  declare updatedAt: Date;
}