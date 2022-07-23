import express, { Request, Response } from 'express';
import { Server } from "http";
import SocketIO from 'socket.io';
import cors from 'cors';
import 'dotenv/config';

import accountsRouter from './routers/AccountsRouter';

const app = express();
app.use(cors());
app.use(express.json());
const http = new Server(app);
const io = SocketIO(http);

const port = process.env.PORT;

app.use("/accounts", accountsRouter);

http.listen(port, () => {
  return console.log(`express is listening at http://localhost:${port}`);
});