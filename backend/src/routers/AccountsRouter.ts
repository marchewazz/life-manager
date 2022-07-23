import { Router } from 'express';
import AccountsController from '../controllers/AccountsController';

const accountsRouter = Router();
const accountsController = new AccountsController();

accountsRouter.post('/register', accountsController.registerAccounts);

export default accountsRouter;


