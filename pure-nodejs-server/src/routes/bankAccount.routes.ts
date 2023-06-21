import express, { Router } from 'express';
import BankAccountController from '../controllers/BankAccount.controller';

let router: Router = express.Router();

router.post('/', BankAccountController.create);

router.get('/', BankAccountController.findAll);

router.get('/:id', BankAccountController.findByID);

router.put('/', BankAccountController.update);

router.delete('/:id', BankAccountController.delete);

export default router;
