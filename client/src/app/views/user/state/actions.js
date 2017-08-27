import settings          from '../../../config/settings'
import { thunk, action } from '../../../utils/redux-helpers'
import { getCookie }     from '../../../utils/cookies'


export const LOGIN_REQUEST  = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS  = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE  = 'LOGIN_FAILURE'
export const SET_USER_TOKEN = 'SET_USER_TOKEN'


export const loginRequest = ()    => action(LOGIN_REQUEST)
export const loginSuccess = data  => action(LOGIN_SUCCESS, data.user)
export const loginFailure = err   => action(LOGIN_FAILURE, err.statusText)
export const setUserToken = token => action(SET_USER_TOKEN, token)


export const login = (data = {}) => thunk({
  endpoint:  'login',
  method:    'post',
  body:      data,
  onReq:     loginRequest,
  onErr:     loginFailure,
  onSuccess: loginSuccess
})

/* Dev comments:
  Not a very neat way. I shouldn't be dispatching failure actions if the app couldn't autologin (something that it tries to do every time).
  Only left it like this, so that I can use the thunk wrapper, to make the code nice and neat.
  A better approach would be required for a more robust app.
*/
export const autoLoginUser = () => {
  const token = getCookie(settings.jwtKey)

  if (!token) {
    return loginFailure({status: 'No valid token found'})
  }

  return thunk({
    token,
    endpoint:  'user',
    method:    'get',
    onReq:     loginRequest,
    onErr:     loginFailure,
    onSuccess: loginSuccess
  })
}
