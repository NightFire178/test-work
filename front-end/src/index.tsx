import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router/router';
import {Provider} from 'react-redux'
import store from "./redux/store";
import MaterialUiTheme from "./router/material-ui-theme";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MaterialUiTheme>
        <Router/>
      </MaterialUiTheme>
    </Provider>
  </React.StrictMode>,
document.getElementById('root')
)
;

