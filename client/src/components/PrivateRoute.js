import React, { Component } from 'react'
import { Route, Link, Redirect} from 'react-router-dom'
import {checkAuthState} from '../helpers/auth'

const PrivateRoute = ({ component: Component,authenticated, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );

  export default PrivateRoute;