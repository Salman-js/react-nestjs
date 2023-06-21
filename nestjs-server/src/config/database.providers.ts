import { Sequelize } from 'sequelize-typescript';
import BankAccount from '../bank-account/entities/bank-account.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'con_account',
      });
      sequelize.addModels([BankAccount]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
