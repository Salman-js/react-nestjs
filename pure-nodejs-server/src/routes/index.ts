import { Application, response } from 'express';

import BankAccountRoutes from './bankAccount.routes';

let routes = (app: Application) => {
  app.use('/api/bank-account', BankAccountRoutes);
};

export default routes;
