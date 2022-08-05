import express from 'express';
import { Server } from "http";
import { Server as socketServer } from "socket.io";
import cors from 'cors';
import 'dotenv/config';

import accountsRouter from './routers/AccountsRouter';

import AuthController from './controllers/AuthController';
import NotesController from './controllers/NotesController';
import MoneyController from './controllers/MoneyController';
import DatesController from './controllers/DatesController';

import periodDBOperations from './utilities/periodDBOperations';

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
  const nc = new NotesController();
  const mc = new MoneyController();
  const dc = new DatesController();

  socket.on("userData", async (data: any) => {
    socket.emit("userData", await ac.getUserData(data.token))
  })
  // NOTE
  socket.on("sendNote",async (data: any) => {
    await nc.sendNote(data)
    socket.emit("userData", await ac.getUserData(data.token))
  })
  socket.on("deleteNote",async (data: any) => {
    await nc.deleteNode(data)
    socket.emit("userData", await ac.getUserData(data.token))
  })
  socket.on("updateBalance", async (data: any) => {
    await mc.updateBalance(data)
    socket.emit("userData", await ac.getUserData(data.token))
  })
  // MONEY
  socket.on("saveOperation",async (data: any) => {
    await mc.saveOperation(data)
    socket.emit("userData", await ac.getUserData(data.token))
  })
  socket.on("deleteOperation",async (data: any) => {
    await mc.deleteOperation(data)
    socket.emit("userData", await ac.getUserData(data.token))
  })
  // DATES
  socket.on("saveDate",async (data: any) => {
    await dc.saveDate(data)
    socket.emit("userData", await ac.getUserData(data.token))
  })
  socket.on("deleteDate",async (data: any) => {
    await dc.deleteDate(data)
    socket.emit("userData", await ac.getUserData(data.token))
  })
})

setInterval(() => {
  periodDBOperations();
}, 60000)

http.listen(port, () => {
  return console.log(`express is listening at http://localhost:${port}`);
});