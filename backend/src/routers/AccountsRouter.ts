import { Router } from 'express';
import AccountsController from '../controllers/AccountsController';

const accountsRouter = Router();
const accountsController = new AccountsController();

accountsRouter.post('/register', accountsController.registerAccounts);
accountsRouter.post('/login', accountsController.loginAccount);

export default accountsRouter;


