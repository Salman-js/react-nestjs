export class CreateBankAccountDto {
  accountNumber: number;
  bankName: string;
  accountType: string;
  minimum: number;
  country: string;
  date: string;
  currency: string;
  startingBalance: number;
  currentBalance: number;
}
