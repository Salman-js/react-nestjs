import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  NotFoundException,
  Delete,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { schema, number } from 'evalidate';
import { BankAccountService } from './bank-account.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Controller('api/bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    const Schema = new schema({});
    const result = Schema.validate(createBankAccountDto);
    if (result.isValid) {
      try {
        return this.bankAccountService.create(createBankAccountDto);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    } else {
      throw new BadRequestException();
    }
  }

  @Get()
  findAll() {
    return this.bankAccountService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.bankAccountService.findOne(+id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Put()
  update(@Body() updateBankAccountDto: UpdateBankAccountDto) {
    const Schema = new schema({
      id: number().required(),
    });
    const result = Schema.validate(updateBankAccountDto);
    if (!result.isValid) {
      throw new BadRequestException();
    }
    return this.bankAccountService.update(
      updateBankAccountDto.id,
      updateBankAccountDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountService.remove(+id);
  }
}
