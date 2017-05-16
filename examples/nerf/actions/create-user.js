'use strict'
import nets from 'nets'
import {clearNotification} from './clear-notification'

export default function createUserReducer (state, action) {
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
      state.avatar = ''
      state.username = ''
      state.email = ''
      state.users.unshift(action.user)
      break
  }
  return state
}

export function createUser (user) {
  return function (dispatch) {
    dispatch({
      type: 'createUser',
      status: 'loading'
    })

    nets({
      method: 'POST',
      url: '/api/users',
      json: user
    }, function (err, resp, body) {
      if (err || resp.statusCode !== 201) {
        dispatch(clearNotification('userCreatedError'))
        return dispatch({
          type: 'createUser',
          status: 'error',
          reasons: (body && body.reasons) || [{
            message: 'Error creating user: ' + err.code,
            code: 'userCreatedError',
            level: 'error'
          }]
        })
      }

      dispatch(clearNotification('userCreated'))
      dispatch({
        type: 'createUser',
        status: 'success',
        user: body,
        reasons: (body && body.reasons) || [{
          message: 'User created!',
          code: 'userCreated',
          level: 'success'
        }]
      })
    })
  }
}
