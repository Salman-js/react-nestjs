import async from 'async';
import { Transaction } from 'sequelize';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../errors/Errors';
import { createTransaction } from '../controllers/BankAccount.controller';
import BankAccountDAL from '../dals/BankAccount.dal';
import BankAccount from '../models/BankAccount.model';

class BankAccountService {
  /**
   * Create Bank Account
   *
   * @param {BankAccount} account
   */

  static create(account: any): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            BankAccountDAL.create(account, transaction)
              .then(() => done(null, transaction))
              .catch((error) =>
                done(new InternalServerError(error), transaction)
              );
          },
        ],
        (error, transaction: any) => {
          if (error) {
            reject(error);
            console.log(error);
            transaction.rollback();
          } else {
            transaction.commit();
            resolve(true);
          }
        }
      );
    });
  }

  /**
   * Find Every Account
   *
   *
   * @returns {Promise<BankAccount[]>}
   */
  public static findAll(query: any): Promise<BankAccount[]> {
    return new Promise((resolve, reject) => {
      BankAccountDAL.findAll(query)
        .then((account: BankAccount[]) => {
          resolve(account);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find Account by ID
   *
   * @param {string} id
   */
  public static async findByID(id: string): Promise<BankAccount | null> {
    try {
      const query = { id };
      const result = await BankAccountDAL.findOne(query);
      return result;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }

  /**
   * Update Account
   *
   * @param {int} id
   * @param {BankAccount} payload
   */
  static update(id: number, payload: BankAccount, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      // Check if an account with that id exists before attempting to update
      async.waterfall(
        [
          (done: Function) => {
            BankAccountDAL.findOne({ id })
              .then((account) => {
                if (account) {
                  done(null, account);
                } else {
                  done(new NotFoundError('Account not found'));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (account: BankAccount, done: Function) => {
            BankAccountDAL.update(account, payload, transaction)
              .then((result) => resolve(result))
              .catch((error) => done(new BadRequestError(error)));
          },
        ],
        (error) => {
          if (error) {
            console.log(error);
            reject(error);
          }
        }
      );
    });
  }

  /**
   * Delete Account By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<BankAccount> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      BankAccountDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default BankAccountService;
