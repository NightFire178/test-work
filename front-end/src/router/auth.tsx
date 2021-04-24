import React, {FunctionComponent} from 'react';
import {useSelector} from 'react-redux'
import {Route, Redirect, RouteProps} from 'react-router-dom'
import {appStateAuthStatus} from "../redux/reducer/selector/app-state-selector";


interface AuthRoute extends RouteProps {
  component: FunctionComponent
}

const Auth: FunctionComponent<AuthRoute> = ({component: Component, ...rest}) => {
  const auth = useSelector(appStateAuthStatus)
  return <Route
    {...rest}
    render={
      (props: React.ComponentProps<any>) => (auth ? <Component{...props}/> : <Redirect to={'/login'}/>)
    }/>
}

export default Auth;
