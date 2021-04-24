import {io, Socket} from 'socket.io-client'
import {ServerApi, URI} from '../const/api'
import {IJoinRoom, IMessage} from "./data-interface";

export interface IServerChatApi{
  sendChatMessage(message:string):void
  joinRoom({id, name}:{id:string, name:string}, getId:({status, id}:IJoinRoom)=>void):void
  listenChat(chat:({ message, userName }:IMessage) => void):void
  listenUserList(userList:({...arg}:any)=>void):void
  setUserName(user:string):void
  joinRoomDisconnect(): void
  disconnect():void
  userCall(data:any):void
}

class ServerChatApi implements IServerChatApi{
  private _socket: Socket
  private _userName:string
  constructor() {
    this._socket = io(URI.server)
    this._userName = `admin`
  }
  setUserName(user: string){
    this._userName = user
  }
  userCall(data:any) {
    this._socket.emit(`callUser`, data)
  }

  sendChatMessage(message:string){
    this._socket.emit(ServerApi.sendMessage, {userName:this._userName,message})
  }

  joinRoom({id, name}:{id:string, name:string}, getId:({status, id}:IJoinRoom)=>void){
    this._socket.emit(ServerApi.joinRom, {id, name})
    this._socket.on(ServerApi.joinRom, getId)
  }
  joinRoomDisconnect(){
    this._socket.off(ServerApi.joinRom)
  }

  listenChat(chat: ({message, userName}: IMessage) => void) {
    this._socket.on(ServerApi.listenChat, chat)
  }

  listenUserList(userList:(users:string[])=>void){
    this._socket.on(ServerApi.listenUserList, userList)
  }
  disconnect(){
    if(this._socket.connected){
      this._socket.disconnect()
    }
  }
}


export default ServerChatApi

