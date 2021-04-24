import {IServerChatApi} from "../../../socket-io/socket-io"

export enum appStateActionEnum {
  SetDarkMode  = 'SET_THEME',
  SetAuthStatus = 'SET_AUTH_STATUS',
  SetUserName = 'SET_USER_NAME',
  SetChatSocket = 'SET_CHAT_SOCKET'
}

export const appStateActionCreators = {
  setDarkMode : (payload:boolean):ISetThemeAction =>({type:appStateActionEnum.SetDarkMode, payload}),
  setAuthStatus: (payload:boolean):ISetAuthStatus =>({type:appStateActionEnum.SetAuthStatus, payload}),
  setUserName: (payload:string):ISetUserName => ({type:appStateActionEnum.SetUserName, payload}),
  setChatSocket: (payload:IServerChatApi):ISetChatSocket=>({type:appStateActionEnum.SetChatSocket, payload})
}

export interface IAppState {
  darkMode:boolean,
  authStatus: boolean,
  userName: string,
  chatSocket: IServerChatApi
}

interface ISetChatSocket {
  type: appStateActionEnum.SetChatSocket,
  payload: IServerChatApi
}

interface ISetUserName {
  type: appStateActionEnum.SetUserName,
  payload: string
}

interface ISetAuthStatus {
  type: appStateActionEnum.SetAuthStatus,
  payload: boolean
}

interface ISetThemeAction{
  type: appStateActionEnum.SetDarkMode ,
  payload:boolean
}

export type appStateActionTypes =
  ISetThemeAction |
  ISetAuthStatus |
  ISetUserName |
  ISetChatSocket