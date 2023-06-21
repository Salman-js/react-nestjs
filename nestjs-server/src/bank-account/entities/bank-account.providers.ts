import BankAccount from './bank-account.entity';

export const accountsProvider = [
  {
    provide: 'ACCOUNT_REPOSITORY',
    useValue: BankAccount,
  },
];
