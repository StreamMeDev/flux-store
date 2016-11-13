function bindActionCreator (actionCreator, dispatch) {
	return function (...args) {
		return dispatch(actionCreator(...args));
	};
}

export function bindActionCreators (actionCreators, dispatch) {
	if (typeof actionCreators === 'function') {
		return bindActionCreator(actionCreators, dispatch);
	}

	return Object.keys(actionCreators).reduce(function (obj, key) {
		obj[key] = bindActionCreator(actionCreators[key], dispatch);
		return obj;
	}, {});
}
