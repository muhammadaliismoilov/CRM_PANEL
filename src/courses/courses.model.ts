import { Table, Column, Model, DataType, PrimaryKey, Default, HasMany, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { student } from '../students/student.model';
import { teachers } from '../teachers/teachers.model';

@Table({ tableName: 'courses' })
export class courses extends Model {
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

  @ForeignKey(() => teachers)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  teacherId: string;

  @BelongsTo(() => teachers)
  teacher: teachers;

  @HasMany(() => student)
  students: student[];

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