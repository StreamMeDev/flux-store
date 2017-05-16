'use strict'
const Store = require('./store')

// This method is reccomended because it does not rely on
// the store methods maintaining their `this` context.
// But if you are a pro, and want to use the class directly
module.exports = function createStore (reducers, initialState) {
  // Create the store
  var store = new Store(reducers, initialState)

  // Return the public interface
  return {
    dispatch: function dispatch (action) {
      return store.dispatch(action)
    },
    subscribe: function subscribe (listener) {
      return store.subscribe(listener)
    },
    addReducer: function addReducer (type, reducer) {
      return store.addReducer(type, reducer)
    },
    replaceReducers: function replaceReducers (reducers) {
      return store.replaceReducers()
    },
    replaceState: function replaceState (state) {
      return store.replaceState(state)
    },
    getState: function getState () {
      return store.getState()
    }
  }
}
