import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'complaints' })
export class Complaint extends Model<Complaint> {
  @Column({ type: DataType.STRING, allowNull: false })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phoneNumber: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  complaint: string;
}
