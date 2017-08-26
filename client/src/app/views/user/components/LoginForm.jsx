import PropTypes                from 'prop-types'
import React, { PureComponent } from 'react'
import { login }                from '../state/actions'


export default class LoginForm extends PureComponent {

  static propTypes = {
    dispatch:     PropTypes.func.isRequired,
    loginPending: PropTypes.bool.isRequired,
    loggedIn:     PropTypes.bool.isRequired,
    loginError:   PropTypes.string
  }


  onSubmit = e => {
    const { dispatch } = this.props
    e.preventDefault()

    const email    = this.refEmail.value
    const password = this.refPassword.value

    if (!email) {
      this.refEmail.focus()
      return
    }

    if (!password) {
      this.refPassword.focus()
      return
    }

    dispatch(login({ email, password }))
  }


  setRefEmail    = el => (this.refEmail = el)
  setRefPassword = el => (this.refPassword = el)


  render() {
    const { loginPending, loginError } = this.props

    const errorMsg = (
      <p className="form-error">
        {loginError}
      </p>
    )

    const btnProps = {}
    let loginTxt = 'Login'
    if (loginPending) {
      btnProps.disabled = true
      loginTxt = 'Logging in...'
    }

    const loginBtn = (
      <button {...btnProps} type="submit" className="btn btn-primary login-button">
        {loginTxt}
      </button>
    )

    return (
      <form
        className="form login-form center"
        onSubmit={this.onSubmit}
      >
        {errorMsg}
        <fieldset className="fieldset">
          <p className="form-row">
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="login-email"
              className="input input-email block"
              ref={this.setRefEmail}
            />
          </p>

          <p className="form-row">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="login-password"
              className="input input-password block"
              ref={this.setRefPassword}
            />
          </p>
        </fieldset>

        <fieldset className="fieldset">
          {loginBtn}
        </fieldset>
      </form>
    )
  }

}
