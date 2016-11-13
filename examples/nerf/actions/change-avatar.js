'use strict';
export default function changeAvatarReducer (state, action) {
	state.avatar = action.value;
	return state;
}

export function changeUserAvatarReducer (state, action) {
	state.user.avatar = action.value;
	return state;
}

export function changeAvatar (value) {
	return {
		type: 'changeAvatar',
		value: value
	};
}
