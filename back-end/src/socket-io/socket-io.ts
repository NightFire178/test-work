import {Server, Socket} from 'socket.io'
import {v4} from 'uuid'
import {IJoinRoom} from "./data-interface";

export enum ServerApi {
  joinRom = `join-room`,
  listenChat = `chat`,
  listenUserList = `user-list`,
  sendMessage = `chat-message`
}

interface IUserList {
  id: string,
  name: string,
  room: string
}

class SocketIo {
  private _io: Server
  private _userList: IUserList[]

  constructor(server: any) {
    this._io = new Server(server, {
      cors: {
        origin: '*',
      }
    })
    this._userList = []
  }
  private _userListSend(id:string){
    const user = this._userList.filter(obj=>obj.room===id).map(obj=>obj.name)
    this._io.to(id).emit(ServerApi.listenUserList, user)
    return user
  }
  private _userListListenEndSend(socket:Socket,id:string){
    const user = this._userListSend(id)
    socket.on(ServerApi.listenUserList, ()=>{
      this._io.to(socket.id).emit(ServerApi.listenUserList, user)
    })
  }

  private _messageListen(socket: Socket, id: string) {
    socket.on(ServerApi.sendMessage, ({message, userName}) => {
      this._io.to(id).emit(ServerApi.listenChat, {message, userName})
    })
  }

  private _joinRoom(socket: Socket) {
    socket.on(ServerApi.joinRom, (args: IJoinRoom) => {
      if (args.id === `0`) {
        const idRoom = v4()
        this._userList.push({
          id: socket.id,
          name: args.name,
          room: idRoom
        })
        socket.join(idRoom)
        socket.emit(ServerApi.joinRom, {id: idRoom, status: true})
        this._messageListen(socket, idRoom)
        this._userListListenEndSend(socket, idRoom)
      } else {
        this._userList.push({
          id: socket.id,
          name: args.name,
          room: args.id
        })
        socket.join(args.id)
        this._io.to(socket.id).emit(ServerApi.joinRom, {id: args.id, status: true})
        this._messageListen(socket, args.id)
        this._userListListenEndSend(socket ,args.id)
      }
    })
  }


  private _disconnect(socket: Socket) {
    socket.on('disconnect', async () => {
      const userOutsider = this._userList.find(obj=>obj.id===socket.id)
      this._userList = await this._userList.filter(obj => obj.id !== socket.id)
      if(userOutsider)
      this._userListSend(userOutsider.room)
    })
  }

  start() {
    this._io.on(`connection`, (socket: Socket) => {
      this._joinRoom(socket)
      this._disconnect(socket)
    })
  }
}

export default SocketIo