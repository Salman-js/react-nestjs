import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import BankAccount from './entities/bank-account.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class BankAccountService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private accountModel: typeof BankAccount,
    private sequelize: Sequelize,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    try {
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        await this.accountModel.create(createBankAccountDto, transactionHost);
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(query: any): Promise<BankAccount[]> {
    try {
      const result = await this.accountModel.findAll({
        where: query,
        order: [
          ['createdAt', 'DESC'],
          ['updatedAt', 'ASC'],
        ],
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    const account = await this.accountModel.findOne({
      where: { id },
    });
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  async update(
    id: number,
    updateBankAccountDto: UpdateBankAccountDto,
  ): Promise<BankAccount> {
    try {
      const account = await this.accountModel.findOne({
        where: { id },
      });

      if (!account) {
        throw new NotFoundException(`Bank account with id ${id} not found.`);
      }

      await account.update(updateBankAccountDto);

      await account.reload();

      return account;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const account = await this.accountModel.findOne({
        where: { id },
      });

      if (!account) {
        throw new Error(`Bank account with id ${id} not found.`);
      }

      await account.destroy();
    } catch (error) {
      throw error;
    }
  }
}
