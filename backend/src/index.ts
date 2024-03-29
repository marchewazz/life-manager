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
import AccountsController from './controllers/AccountsController';

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
  const acC = new AccountsController();
  const nc = new NotesController();
  const mc = new MoneyController();
  const dc = new DatesController();

  // USERDATA
  socket.on("userData", async (data: any) => {
    await socket.emit("userData", await ac.getUserData(data.token))
  })
  socket.on("editUserData", async (data: any) => {
    await socket.emit("sendInfo", await acC.editUserData(data))
    await socket.emit("userData", await ac.getUserData(data.token))
  })
  socket.on("logout", async (data: any) => {
    ac.deleteToken(data)
  })
  // NOTE
  socket.on("sendNote",async (data: any) => {
    await socket.emit("sendInfo", await nc.sendNote(data))
    await socket.emit("userData", await ac.getUserData(data.token))
  })
  socket.on("deleteNote",async (data: any) => {
    await socket.emit("sendInfo", await nc.deleteNode(data))
    await socket.emit("userData", await ac.getUserData(data.token))
  })
  socket.on("editNote",async (data: any) => {
    await socket.emit("sendInfo", await nc.editNote(data))
    await socket.emit("userData", await ac.getUserData(data.token))
  })
  // BALANCE
  socket.on("updateBalance", async (data: any) => {
    await socket.emit("sendInfo", await mc.updateBalance(data))
    await socket.emit("userData", await ac.getUserData(data.token))
  })
  // MONEY
  socket.on("saveOperation",async (data: any) => {
    await socket.emit("sendInfo", await mc.saveOperation(data))
    await socket.emit("userData", await ac.getUserData(data.token))
  })
  socket.on("deleteOperation",async (data: any) => {
    await socket.emit("sendInfo", await mc.deleteOperation(data))
    await socket.emit("userData", await ac.getUserData(data.token))
  })
  socket.on("editOperation",async (data: any) => {
    await socket.emit("sendInfo", await mc.editOperation(data))
    await socket.emit("userData", await ac.getUserData(data.token))
  })
  // DATES
  socket.on("saveDate",async (data: any) => {
    await socket.emit("sendInfo", await dc.saveDate(data))
    await socket.emit("userData", await ac.getUserData(data.token))
  })
  socket.on("deleteDate",async (data: any) => {
    await socket.emit("sendInfo", await dc.deleteDate(data))
    await socket.emit("userData", await ac.getUserData(data.token))
  })
  socket.on("editDate",async (data: any) => {
    await socket.emit("sendInfo", await dc.editDate(data))
    await socket.emit("userData", await ac.getUserData(data.token))
  })
})

setInterval(() => {
  periodDBOperations();
}, 60000)

http.listen(port, () => {
  return console.log(`express is listening at http://localhost:${port}`);
});