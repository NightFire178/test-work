import ExpressServer from './express/express-app'
import SocketIo from "./socket-io/socket-io";
import {createServer} from "http";

const express = new ExpressServer()
const http = createServer(express.start())
const io = new SocketIo(http)
http.listen(3500)
io.start()