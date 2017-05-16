'use strict'
export default function changeUsernameReducer (state, action) {
  state.username = action.value
  return state
}

export function changeUserUsernameReducer (state, action) {
  state.user.username = action.value
  return state
}

export function changeUsername (value) {
  return {
    type: 'changeUsername',
    value: value
  }
}
