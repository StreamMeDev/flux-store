var _state = Symbol('state');
var _listeners = Symbol('listeners');
var _reducers = Symbol('reducers');
var _replaceState = Symbol('replaceState');

export class Store {
	constructor (reducers, initialState) {
		// The listeners are an array
		this[_listeners] = [];

		// Add the reducers
		this.replaceReducers(reducers);

		// Set initial state
		this.replaceState(initialState);
	}

	dispatch (action) {
		if (!action) {
			return;
		}

		// Actions that are functions get called with the
		// dispatch mathed, like react-thunk
		if (typeof action === 'function') {
			return action(this.dispatch.bind(this));
		}

		// Actions that are promises are async,
		// and get dispatched with the resolve value
		if (action instanceof Promise) {
			var _dispatch = function (_action) {
				this.dispatch(_action);
			}.bind(this);
			return action.then(_dispatch, _dispatch);
		}

		// Keep the old state to send to the listeners
		var _s = this[_state];

		// Call the reducer
		if (this[_reducers][action.type]) {
			this[_state] = this[_reducers][action.type](this[_state], action);
		}

		// Fire listener callbacks
		this[_listeners].forEach((listener) => {
			listener(this[_state], _s, action);
		});

		// Each type of action handled returns something,
		// figured this may be helpful for someone
		return action;
	}

	subscribe (listener) {
		// Keep the state so we only unsubscribe once
		var subscribed = true;

		// Add the listener
		this[_listeners].push(listener);

		// Return the unsubscribe
		return () => {
			if (!subscribed) {
				return;
			}
			subscribed = false;
			this[_listeners].splice(this[_listeners].indexOf(listener), 1);
		};
	}

	addReducer (type, fnc) {
		this[_reducers][type] = fnc;
	}

	replaceReducers (reducers) {
		this[_reducers] = reducers || {};

		// Always add replace state reducer
		this[_reducers][_replaceState] = replaceStateReducer;
	}

	replaceState (state) {
		this.dispatch({
			type: _replaceState,
			state: state
		});
	}

	getState () {
		return Object.assign({}, this[_state]);
	}
}

function replaceStateReducer (state, action) {
	return action.state;
}
