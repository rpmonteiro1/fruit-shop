/* Dev comments:
  HOC that allows you access into the app if you're authenticated.
*/

import React               from 'react'
import PropTypes           from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

const AuthRoute = ({ component, authHandler, authPath, ...props }) => {
  if (authHandler) {
    const authRedirectTo = authHandler()
    if (authRedirectTo) {
      // redirect to authentication route
      const location = {
        pathname: authPath,
        state:    {
          from: authRedirectTo
        }
      }

      window._loginRedirect = authRedirectTo
      return <Redirect to={location} />
    }

    // authenticated so proceed
    return <Route {...props} component={component} />
  } else {
    // work as a standard route
    return <Route {...props} component={component} />
  }
}

AuthRoute.propTypes = {
  component:   PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  authHandler: PropTypes.func,
  authPath:    PropTypes.string
}

export default AuthRoute
