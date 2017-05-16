'use strict'
import nets from 'nets'
import {clearNotification} from './clear-notification'

export default function saveUserReducer (state, action) {
  switch (action.status) {
    case 'loading':
      state.loading = true
      break
    case 'error':
      state.loading = false
      state.notifications = action.reasons || []
      break
    case 'success':
      state.loading = false
      state.notifications = action.reasons || []
      state.user = action.user
      break
  }
  return state
}

export function saveUser (id, user) {
  return function (dispatch) {
    dispatch({
      type: 'saveUser',
      status: 'loading'
    })

    nets({
      method: 'POST',
      url: '/api/users/' + id,
      json: user
    }, function (err, resp, body) {
      if (err || resp.statusCode !== 200) {
        dispatch(clearNotification('userSaveError'))
        return dispatch({
          type: 'saveUser',
          status: 'error',
          reasons: (body && body.reasons) || [{
            message: 'Error saving user: ' + err.code,
            code: 'userSaveError',
            level: 'error'
          }]
        })
      }

      dispatch(clearNotification('userSaved'))
      dispatch({
        type: 'saveUser',
        status: 'success',
        user: body,
        reasons: (body && body.reasons) || [{
          message: 'User saved!',
          code: 'userSaved',
          level: 'success'
        }]
      })
    })
  }
}
