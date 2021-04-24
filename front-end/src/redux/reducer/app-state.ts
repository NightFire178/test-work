import {appStateActionEnum, appStateActionTypes, IAppState} from "./types/t-app-state";
import ServerChatApi from "../../socket-io/socket-io";

const initialAppState:IAppState = {
  darkMode:false,
  authStatus:false,
  userName: '',
  chatSocket: new ServerChatApi()
}

export function appState(state = initialAppState, action: appStateActionTypes): IAppState {
  switch (action.type) {
    case appStateActionEnum.SetDarkMode:
      return {...state, darkMode:action.payload}
    case appStateActionEnum.SetAuthStatus:
      return {...state, authStatus:action.payload}
    case appStateActionEnum.SetUserName:
      return {...state, userName: action.payload}
    default:
      return state;
  }
}