"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const uri_1 = require("../uri");
class ExpressServer {
    constructor() {
        this._app = express_1.default();
    }
    _use() {
        this._app.use(express_1.default.static(path_1.default.resolve(__dirname, uri_1.Uri.public)));
    }
    _get() {
        this._app.get('/', (req, res) => {
            console.log(path_1.default.resolve(__dirname, uri_1.Uri.public));
            this._app.use(express_1.default.static(path_1.default.resolve(__dirname, uri_1.Uri.index)));
        });
    }
    _listen() {
        return this._app.listen(() => console.log(`express listen`));
    }
    get app() {
        return this._app;
    }
    start() {
        this._use();
        this._get();
        this._listen();
        return this._app;
    }
}
exports.default = ExpressServer;
