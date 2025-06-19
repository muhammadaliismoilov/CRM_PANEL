import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { courses } from './courses.model';

@Table
export class student extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  login: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  parentName: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  parentPhoneNumber: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  img: string;

  @Column({
    type: DataType.ENUM('student', 'teacher', 'admin', 'superadmin'),
    defaultValue: 'student',
  })
  role: string;

  @ForeignKey(() => courses)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  courseId: string;

  @BelongsTo(() => courses)
  course: courses;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  declare updatedAt: Date;
}