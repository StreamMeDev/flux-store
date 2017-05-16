'use strict'

module.exports = function combineReducers (reducers) {
  // ensure array
  var _reducers
  if (!Array.isArray(reducers)) {
    _reducers = [reducers]
  } else {
    _reducers = reducers
  }

  // I just want to say I think this is illegiable, and I think
  // this code is much better understood in its original form:
  //
  // return function (initialState, action) {
  //   return _reducers.reduce(function (function (state, reducer) {
  //     return reducer(state, action)
  //   }, initialState)
  // }
  return (initialState, action) => _reducers.reduce((state, reducer) => reducer(state, action), initialState)
}
