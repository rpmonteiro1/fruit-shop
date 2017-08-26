import PropTypes                from 'prop-types'
import React, { PureComponent } from 'react'
import { connect }              from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import Helmet                   from 'react-helmet'
import LoginForm                from './components/LoginForm'


export class LoginView extends PureComponent {

  static propTypes = {
    dispatch:     PropTypes.func,
    showLogin:    PropTypes.bool,
    loginPending: PropTypes.bool,
    loggedIn:     PropTypes.bool,
    loginError:   PropTypes.string,
    location:     PropTypes.object
  }

  render() {
    if (this.props.loggedIn) {
      const state = this.props.location.state
      const to = (state && state.from) || window._loginRedirect || '/shop'
      window._loginRedirect = null

      return <Redirect to={to !== '/login' ? to : '/shop'} push={false} />
    }

    return (
      <div className="app page-login">
        <Helmet title="Login" />
        <LoginForm {...this.props} />
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    showLogin:    state.user.get('showLogin'),
    loginPending: state.user.get('pending'),
    loggedIn:     state.user.get('loggedIn'),
    loginError:   state.user.get('error')
  }
}

export default withRouter(connect(mapStateToProps)(LoginView))
