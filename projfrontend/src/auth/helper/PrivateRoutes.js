import {Redirect, Route} from 'react-router-dom'
import React from 'react'
import { isAuthenticated } from './index';

const PrivateRoutes = ({component : Component, ...rest}) => {
  debugger
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props}/> : (<Redirect to={{ pathname: "/signin", state: { from: props.location }}} />)
      }
    />
  );
}
 
export default PrivateRoutes;