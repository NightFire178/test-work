import path from 'path'
import express, {Express} from 'express'
import cors from 'cors'
import {Uri} from "../uri";

class ExpressServer {
  private readonly _app: Express;

  constructor() {
    this._app = express();
  }

  private _use() {
    this._app.use(express.static(path.resolve(__dirname,  Uri.public)))
  }

  private _get() {
    this._app.get('/', (req: express.Request, res: express.Response) => {
      console.log(path.resolve(__dirname, Uri.public))
      this._app.use(express.static(path.resolve(__dirname, Uri.index)))
    });
  }

  private _listen() {
    return  this._app.listen(()=>console.log(`express listen`));
  }

  get app() {
    return this._app
  }

  start() {
    this._use()
    this._get()
    this._listen()
    return this._app
  }
}

export default ExpressServer