'use strict';
export default function changeEmailReducer (state, action) {
	state.email = action.email;
	return state;
}

export function changeEmail (value) {
	return {
		type: 'changeEmail',
		email: value
	};
}
