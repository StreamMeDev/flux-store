'use strict'
import UserList from './container.jsx'
import {createStore, bindActionCreators} from '@streammedev/flux-store'
import createUserReducer, {createUser} from '../../actions/create-user'
import deleteUserFromListReducer, {deleteUser} from '../../actions/delete-user'
import changeAvatarReducer, {changeAvatar} from '../../actions/change-avatar'
import changeUsernameReducer, {changeUsername} from '../../actions/change-username'
import changeEmailReducer, {changeEmail} from '../../actions/change-email'
import clearNotificationReducer from '../../actions/clear-notification'

export default function (req, res) {
  // Create the store with the reducers
  var store = createStore({
    createUser: createUserReducer,
    deleteUser: deleteUserFromListReducer,
    changeAvatar: changeAvatarReducer,
    changeEmail: changeEmailReducer,
    changeUsername: changeUsernameReducer,
    clearNotification: clearNotificationReducer
  })

  // Subscribe to state changes to render the component
  var unsubscribe = store.subscribe(function (state) {
    res.renderReactComponent(UserList, state)
  })

  // Add action creators and dispatch to the context/store,
  // along with other view related state initializers
  // and replace the stores state with the new object
  store.replaceState(Object.assign(res.locals.context, bindActionCreators({
    changeAvatar,
    changeEmail,
    changeUsername,
    createUser,
    deleteUser
  }, store.dispatch), {
    dispatch: store.dispatch
  }))

  // On route change, unsubscribe the listener
  req.emitter.once('routeChange', unsubscribe)
}
