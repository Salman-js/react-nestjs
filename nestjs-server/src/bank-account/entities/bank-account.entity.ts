import { DataTypes } from 'sequelize';
import { Model, Column, Table } from 'sequelize-typescript';

@Table({ tableName: 'bank_accounts' })
class BankAccount extends Model<BankAccount> {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataTypes.BIGINT, allowNull: false })
  accountNumber!: number;

  @Column({ type: DataTypes.STRING, allowNull: false })
  bankName!: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  accountType!: string;

  @Column({ type: DataTypes.INTEGER, allowNull: false })
  minimum!: number;

  @Column({ type: DataTypes.STRING, allowNull: false })
  country!: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  date!: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  currency!: string;

  @Column({ type: DataTypes.DECIMAL(10, 2), allowNull: false })
  startingBalance!: number;

  @Column({ type: DataTypes.DECIMAL(10, 2), allowNull: false })
  currentBalance!: number;

  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;
}

export default BankAccount;
