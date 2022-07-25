import express from 'express';
import { Server } from "http";
import { Server as socketServer } from "socket.io";
import cors from 'cors';
import 'dotenv/config';

import accountsRouter from './routers/AccountsRouter';

import AuthController from './controllers/AuthController';

const app = express();
app.use(cors());
app.use(express.json());
const http = new Server(app);
const io = new socketServer(http, {
  cors: {
    origin: "http://localhost:4200",
  }
});

const port = process.env.PORT;

app.use("/accounts", accountsRouter);

io.on("connection", (socket: any) => {
  const ac = new AuthController();
  socket.on("userData", async (data: any) => {
    socket.emit("userData", await ac.getUserData(data.token))
  })
})

http.listen(port, () => {
  return console.log(`express is listening at http://localhost:${port}`);
});