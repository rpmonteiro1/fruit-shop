/* Dev comments:
  Some tiny helpers to help with the Boilerplate that comes with Redux. This thunk helpers is pretty limited, because in more complicated apps we usually need to do some logic before communicating with the server. But for the fruit shop, it's all pretty straightforward api calls.
*/

import fetch                          from 'isomorphic-fetch'
import settings                       from '../config/settings'
import { checkHttpStatus, parseJSON } from './helpers'
import { flashMessage }               from '../ui/flash/flash-redux'

export function action(type, data) {
  return { type, data }
}

export function thunk({endpoint, method, token, body, onReq, onErr, onSuccess}) {
  return (dispatch, getState) => {
    const url     = `${settings.apiServer}/${endpoint}`
    const _token  = getState().user.get('token')
    const options = {
      method,
      headers: {
        Authorization:  `Bearer ${token || _token}`,
        Accept:         'application/json',
        'Content-Type': 'application/json'
      }
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    dispatch(onReq())

    return fetch(url, options)
      .then(checkHttpStatus)
      .then(parseJSON)
      .catch(err => {
        if (err.err) {
          dispatch(flashMessage({message: err.err.message, type: 'error'}))
        }
        dispatch(onErr(err))
      })
      .then(res => {
        if (res && res.message) {
          dispatch(flashMessage({message: res.message, type: 'success'}))
        }
        dispatch(onSuccess(res))
      })
  }
}
