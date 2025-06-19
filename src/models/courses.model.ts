import { Table, Column, Model, DataType, PrimaryKey, Default, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { student } from './student.model';

@Table
export class courses extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare  id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  courseName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  lessonDays: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  lessonTime: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  teacherName: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  teacherPhoneNumber: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  teacherImg: string;

  @HasMany(() => student)
  students: student[];

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  declare  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  declare updatedAt: Date;
}