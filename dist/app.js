"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_app_1 = __importDefault(require("./express/express-app"));
const socket_io_1 = __importDefault(require("./socket-io/socket-io"));
const http_1 = require("http");
const express = new express_app_1.default();
const http = http_1.createServer(express.start());
const io = new socket_io_1.default(http);
http.listen(3500);
io.start();
