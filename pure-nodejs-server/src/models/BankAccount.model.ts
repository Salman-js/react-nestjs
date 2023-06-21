import { Model, DataTypes, Sequelize } from 'sequelize';

class BankAccount extends Model {
  public id!: number;
  public accountNumber!: string;
  public bankName!: string;
  public accountType!: string;
  public minimum!: number;
  public country!: string;
  public date!: string;
  public currency!: string;
  public startingBalance!: number | string;
  public currentBalance!: number | string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        accountNumber: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        bankName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        accountType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        minimum: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        country: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        date: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        currency: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        startingBalance: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        currentBalance: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        tableName: 'bank_accounts',
        sequelize,
      }
    );
  }
}

export default BankAccount;
