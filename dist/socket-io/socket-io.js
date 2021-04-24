"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerApi = void 0;
const socket_io_1 = require("socket.io");
const uuid_1 = require("uuid");
var ServerApi;
(function (ServerApi) {
    ServerApi["joinRom"] = "join-room";
    ServerApi["listenChat"] = "chat";
    ServerApi["listenUserList"] = "user-list";
    ServerApi["sendMessage"] = "chat-message";
})(ServerApi = exports.ServerApi || (exports.ServerApi = {}));
class SocketIo {
    constructor(server) {
        this._io = new socket_io_1.Server(server, {
            cors: {
                origin: '*',
            }
        });
        this._userList = [];
    }
    _userListSend(id) {
        const user = this._userList.filter(obj => obj.room === id).map(obj => obj.name);
        this._io.to(id).emit(ServerApi.listenUserList, user);
        return user;
    }
    _userListListenEndSend(socket, id) {
        const user = this._userListSend(id);
        socket.on(ServerApi.listenUserList, () => {
            this._io.to(socket.id).emit(ServerApi.listenUserList, user);
        });
    }
    _messageListen(socket, id) {
        socket.on(ServerApi.sendMessage, ({ message, userName }) => {
            this._io.to(id).emit(ServerApi.listenChat, { message, userName });
        });
    }
    _joinRoom(socket) {
        socket.on(ServerApi.joinRom, (args) => {
            if (args.id === `0`) {
                const idRoom = uuid_1.v4();
                this._userList.push({
                    id: socket.id,
                    name: args.name,
                    room: idRoom
                });
                socket.join(idRoom);
                socket.emit(ServerApi.joinRom, { id: idRoom, status: true });
                this._messageListen(socket, idRoom);
                this._userListListenEndSend(socket, idRoom);
            }
            else {
                this._userList.push({
                    id: socket.id,
                    name: args.name,
                    room: args.id
                });
                socket.join(args.id);
                this._io.to(socket.id).emit(ServerApi.joinRom, { id: args.id, status: true });
                this._messageListen(socket, args.id);
                this._userListListenEndSend(socket, args.id);
            }
        });
    }
    _disconnect(socket) {
        socket.on('disconnect', async () => {
            const userOutsider = this._userList.find(obj => obj.id === socket.id);
            this._userList = await this._userList.filter(obj => obj.id !== socket.id);
            if (userOutsider)
                this._userListSend(userOutsider.room);
        });
    }
    start() {
        this._io.on(`connection`, (socket) => {
            this._joinRoom(socket);
            this._disconnect(socket);
        });
    }
}
exports.default = SocketIo;
