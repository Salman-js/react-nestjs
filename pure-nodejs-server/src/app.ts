import express, { Express } from 'express';
import cors from 'cors';
import { Sequelize, Transaction } from 'sequelize';
import dbConfig from './config/database';
import BankAccount from './models/BankAccount.model';
import routes from './routes';

class App {
  public app: Express;
  public port: number;
  public sequelize: Sequelize;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.sequelize = new Sequelize(dbConfig);

    this.initializeMiddlewares();
    this.initializeModels();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initializeModels() {
    this.sequelize.sync();
    BankAccount.initialize(this.sequelize);
  }

  private initializeRoutes() {
    routes(this.app);
  }

  // public createTransaction = (): Promise<Transaction> => {
  //   return new Promise(async (resolve, reject) => {
  //     this.sequelize
  //       .transaction()
  //       .then((transaction) => resolve(transaction))
  //       .catch((error) => reject(error));
  //   });
  // };

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default App;
