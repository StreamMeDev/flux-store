/* global describe, it */
var assert = require('assert');
var Store = require('../');

describe('flux-store', function () {
	it('should dispatch a sync action', function (done) {
		var s = new Store({
			changeFoo: function (state, action) {
				state.foo = action.value;
				return state;
			}
		}, {
			foo: 'bar'
		});
		s.subscribe(function (state) {
			assert.equal(state.foo, 'baz');
			done();
		});
		s.dispatch({
			type: 'changeFoo',
			value: 'baz'
		});
	});
	it('should dispatch an action with a promise', function (done) {
		var s = new Store({
			changeFoo: function (state, action) {
				state.foo = action.value;
				return state;
			}
		}, {
			foo: 'bar'
		});
		s.subscribe(function (state) {
			assert.equal(state.foo, 'baz');
			done();
		});
		s.dispatch(new Promise(function (resolve) {
			setTimeout(function () {
				resolve({
					type: 'changeFoo',
					value: 'baz'
				});
			}, 10);
		}));
	});
	it('should dispatch an action with a function', function (done) {
		var s = new Store({
			changeFoo: function (state, action) {
				state.foo = action.value;
				return state;
			}
		}, {
			foo: 'bar'
		});
		var called = 1;
		s.subscribe(function (state) {
			assert.equal(state.foo, called);
			called++;
			if (called === 2) {
				done();
			}
		});
		s.dispatch(function (dispatch) {
			dispatch({
				type: 'changeFoo',
				value: 1
			});

			setTimeout(function () {
				dispatch({
					type: 'changeFoo',
					value: 2
				});
			}, 10);
		});
	});
});
