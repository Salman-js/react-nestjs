export type rowType = {
  id: number;
  accountNumber: number;
  bankName: string;
  accountType: string;
  minimum: number;
  country: string;
  date: string;
  currency: 'ETB' | '$';
  startingBalance: number | string;
  currentBalance: number | string;
  updatedAt: Date;
  createdAt: Date;
};
