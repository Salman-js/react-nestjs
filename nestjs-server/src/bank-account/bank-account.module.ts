import { Module } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { BankAccountController } from './bank-account.controller';
import { DatabaseModule } from 'src/config/database.module';
import { accountsProvider } from './entities/bank-account.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BankAccountController],
  providers: [BankAccountService, ...accountsProvider],
})
export class BankAccountModule {}
