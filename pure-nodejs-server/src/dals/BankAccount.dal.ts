import { Transaction } from 'sequelize';
import BankAccount from '../models/BankAccount.model';

class BankAccountDAL {
  /**
   * Create Bank ccount
   *
   * @param {BankAccount} account
   * @param {Transaction} transaction
   */
  static async create(
    account: any,
    transaction?: Transaction
  ): Promise<BankAccount> {
    try {
      const result = await BankAccount.create(account, { transaction });
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find All Bank accounts
   *
   * @param {any} query
   */
  static async findAll(query: any) {
    try {
      const result = await BankAccount.findAll({
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

  /**
   * Find One Account
   *
   * @param {any} query
   */
  static async findOne(query: any) {
    try {
      const result = await BankAccount.findOne({
        where: query,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update Bank account
   * @param {BankAccount} account
   * @param {Object} payload
   */
  static async update(
    account: BankAccount,
    payload: BankAccount,
    transaction?: Transaction
  ) {
    try {
      if (account) {
        // Check if account object is provided
        const updatedAccount = await account.update(payload, { transaction });
        return updatedAccount;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete Account
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      BankAccount.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default BankAccountDAL;
