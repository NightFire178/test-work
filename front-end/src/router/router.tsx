import React, {FC} from "react";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Auth from "./auth";
import Login from "../component/login";
import Chat from "../component/chat/chat";

const Router: FC = () => {
  return (<>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Auth path="/chat/:id?" exact component={Chat}/>
        <Route
          render={() => (
            <>
              <h1>
                404.
                <br/>
                <small>Page not found</small>
              </h1>
              <Link to="/">Go to main page</Link>
            </>
          )}
        />
      </Switch>
    </BrowserRouter>
  </>);
}

export default Router;
