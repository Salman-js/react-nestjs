import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankAccountModule } from './bank-account/bank-account.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    BankAccountModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      username: 'root',
      password: '',
      database: 'con_account',
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
