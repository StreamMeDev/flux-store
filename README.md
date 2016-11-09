# Flux Store

[![NPM Version](https://img.shields.io/npm/v/@streammedev/flux-store.svg)](https://npmjs.org/package/@streammedev/flux-store)
[![NPM Downloads](https://img.shields.io/npm/dm/@streammedev/flux-store.svg)](https://npmjs.org/package/nighthawk)
[![js-happiness-style](https://img.shields.io/badge/code%20style-happiness-brightgreen.svg)](https://github.com/JedWatson/happiness)

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
import {Store} from '@streammedev/flux-store';

// Create our reducers
function incr (state = 0, action) {
  return state + (action.value || 1);
}
function decr (state = 0, action) {
  return state - (action.value || 1);
}

// Create our store instance with an 
// initial state and the reducers
var store = new Store(0, {
	incr: incr,
	decr: decr
});

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
