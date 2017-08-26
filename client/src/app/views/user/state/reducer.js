import { fromJS }    from 'immutable'
import settings      from '../../../config/settings'
import { setCookie } from '../../../utils/cookies'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER_TOKEN
} from './actions'


const initialState = fromJS({
  token:     '',
  profile:   {},
  pending:   false,
  loggedIn:  false,
  error:     '',
  updatedAt: 0
})


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case LOGIN_REQUEST:
      return state.merge({
        pending:  true,
        loggedIn: false,
        profile:  {},
        error:    '',
        editing:  false
      })

    case LOGIN_SUCCESS: {
      const { token, profile, expires } = action.data
      setCookie(settings.jwtKey, token, expires)
      return state.merge({
        pending:   false,
        loggedIn:  true,
        profile:   profile,
        token:     token,
        error:     '',
        editing:   false,
        updatedAt: Date.now()
      })
    }

    case LOGIN_FAILURE:
      return state.merge({
        pending:  false,
        loggedIn: false,
        profile:  {},
        error:    action.data,
        editing:  false
      })

    case SET_USER_TOKEN:
      return state.set('token', action.data)

    default:
      return state

  }
}
