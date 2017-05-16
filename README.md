# Flux Store

[![NPM Version](https://img.shields.io/npm/v/@streammedev/flux-store.svg)](https://npmjs.org/package/@streammedev/flux-store)
[![NPM Downloads](https://img.shields.io/npm/dm/@streammedev/flux-store.svg)](https://npmjs.org/package/nighthawk)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A Redux like data store without the enforced opinions.  Similar to Redux this module is based 
on Flux principals, the entire state is stored in a single object, and all mutations are
described with action objects and applied with reducers.

The main difference is that this module supports asnycronous actions out of the box, but there are a few
other differences.  This flux store allows for multiple reducers, which can be composed based on the action
name, not the data structure.  This allows for multiple reducers to access and modify data across the application.

## Install

```
$ npm install --save @streammedev/flux-store
```

## Usage

```javascript
import {createStore} from '@streammedev/flux-store';

// Create our reducers
function incr (state = 0, action) {
  return state + (action.value || 1);
}
function decr (state = 0, action) {
  return state - (action.value || 1);
}

// Create our store instance with an 
// initial state and the reducers
var store = createStore({
	incr: incr,
	decr: decr
}, 0);

// Subscribe to changes to the store
store.subscribe((state) => {
  console.log(state);
});

// dispatch some actions
store.dispatch({
  type: 'incr'
}); // 1

store.dispatch({
  type: 'incr',
  value: 2
}); // 3

store.dispatch({
  type: 'decr'
}); // 2

```

## API

### `createStore([reducers[, initialState]])`

Creates a store, with the reducers and state passed in.  This is the reccomended way to create a store because it ensures
the proper scope for the methods even if you pass them around, like in a React app when you pass `dispatch` as a prop.

---

### `Store([reducers[, initialState]])`

The constructor for a store instance.

#### `<Store>.dispatch(action)`

Dispatches an action.  Action's in this store can be one of three things:

1. A simple object.  For sync actions you can simply do this.  The only requirement is that the action
object has a property `type`.
2. A Promise. For actions that do asyncronus things, they should resolve/reject with an action object.
3. A function. For action creators that want to dispatch multiple times. The function will get passed
dispatch as the first and only argument.

#### `<Store>.subscribe(func)`

Subscribe to changes in the store.  The function passed to subscribe will be called every time
an action is dispatched, even if there were no changes to the store.  It is passed the new state,
the old state, and the action dispatched, in that order.  Use this method to update the your views.
Subscribe returns the unsubscribe function.

#### `<Store>.getState()`

Returns a clone of the current state object.

#### `<Store>.replaceState()`

Replaces the current state with a whole new object.  This can be called to clear state between route changes
in a single page app, or to initalize the state of a new store.  It will result in firing your listner functions.

#### `<Store>.replaceReducers()`

Replaces all reducers registered with this store.

#### `<Store>.addReducer(type, reducerFunc)`

Adds a reducer for an action type.

---

### `bindActionCreators(actionCreators, dispatch)`

A utility method which takes an object of action creators and returns a new object where 
each key's function is not wrapped with a call to `dispatch`.  See [Redux's docs for more info](http://redux.js.org/docs/api/bindActionCreators.html).

## Development

This package follows semver, when you wish to publish a version run the proper npm command.  For example, if we made a bug fix you can do this:

```
$ npm version patch
$ git push
$ npm publish
```

Here are the other types of version bumps:

- Major (`npm version major`): This is for breaking changes. Anytime a method is changed or the functionality is modified this bump should be made.
- Minor (`npm version minor`): This is for features additions. When a new method is added which doesn't affect the behavior of existing features, this bump should be made.
- Patch (`npm version patch`): This is for bug fixes. Only bump this if it is safe for production code to update wihout being QA'd.  (AKA, almost never)

For each of these you can run a 'pre' version by prepending to the command, ex `npm version preminor`.

All feature development should be done on a branch off `master`.  When a feature is complete and the pull request approved, publish a 'pre' version of the package for testing across environments.  To install that 'pre' version of the package do the following, where the verison number contains the correct 'pre' version:

```
$ npm install --save @streammedev/store@1.0.0-0
```

Running the tests:

```
$ npm install && npm test
```
