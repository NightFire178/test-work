import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from "./reducer/reducer";
import {appStateActionCreators} from "./reducer/types/t-app-state";

const store: any = createStore(reducer, composeWithDevTools());
store.dispatch(appStateActionCreators.setDarkMode(window.matchMedia(`(prefers-color-scheme:dark)`).matches))


export default store