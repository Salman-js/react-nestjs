import evalidate from 'evalidate';
import { Request, Response } from 'express';
import { Sequelize, Transaction } from 'sequelize';
import { BadRequestError, Error, NotFoundError } from '../errors/Errors';
import BankAccountService from '../services/BankAccount.service';
import dbConfig from '../config/database';

export let sequelize: Sequelize;
class BankAccountController {
  /**
   * Create Bank Account
   *
   * @param {Request} request
   * @param {Response} response
   */

  static async create(request: Request, response: Response) {
    const Schema = new evalidate.schema({});

    const data = request.body;
    const result = Schema.validate(data);

    if (result.isValid) {
      try {
        await BankAccountService.create(data);
        response.status(200).json(true);
      } catch (error: any) {
        console.log(error);
        response.status(error.statusCode).json(error.payload);
      }
    } else {
      const error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Find All Accounts
   *
   * @param {Request} request
   * @param {Response} response
   */
  static async findAll(request: Request, response: Response) {
    try {
      const result = await BankAccountService.findAll({});
      response.json(result);
    } catch (error: any) {
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Find Account by ID
   *
   * @param {Request} request
   * @param {Response} response
   */
  static async findByID(request: Request, response: Response) {
    try {
      const result = await BankAccountService.findByID(request.params.id);
      if (result) {
        response.json(result);
      } else {
        let error: Error = new NotFoundError('Account not found');
        response.status(error.statusCode).json(error.payload);
      }
    } catch (error: any) {
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Update Account
   *
   * @param {Request} request
   * @param {Response} response
   */
  static async update(request: Request, response: Response) {
    try {
      // Define a validation schema to check if an id exists and is type of number
      const Schema = new evalidate.schema({
        id: evalidate.number().required(),
      });

      const data = request.body;
      // Check using the validation schema
      const result = Schema.validate(data);
      if (!result.isValid) {
        throw new BadRequestError(result.errors);
      }

      await BankAccountService.update(data.id, data);
      response.status(200).json(true);
    } catch (error: any) {
      console.log(error);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Delete Account
   *
   * @param {Request} request
   * @param {Response} response
   */
  static delete(request: Request, response: Response) {
    let id = request.params.id;
    BankAccountService.delete(id)
      .then(() => response.status(200).json(true))
      .catch((error) => response.status(error.statusCode).json(error.payload));
  }
}

export const createTransaction = (): Promise<Transaction> => {
  sequelize = new Sequelize(dbConfig);
  return new Promise(async (resolve, reject) => {
    sequelize
      .transaction()
      .then((transaction) => resolve(transaction))
      .catch((error) => reject(error));
  });
};
export default BankAccountController;
