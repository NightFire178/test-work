import { combineReducers } from 'redux';
import {appState} from "./app-state";

const reducer = combineReducers({appState})

export type StoreType = ReturnType<typeof reducer>
export default reducer