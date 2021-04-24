import {StoreType} from "../reducer";

export const appStateDarkModeSelector = (state:StoreType) => state.appState.darkMode
export const appStateAuthStatus = (state:StoreType) => state.appState.authStatus
export const appStateUserName = (state:StoreType) => state.appState.userName
export const appStateChatSocket = (state:StoreType) => state.appState.chatSocket