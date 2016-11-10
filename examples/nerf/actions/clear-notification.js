export default function clearNotificationReducer (state, action) {
	state.notifications = state.notifications.filter(function (note) {
		return action.code !== note.code;
	});
	return state;
}

export function clearNotification (code, time = 8000) {
	return function (dispatch) {
		setTimeout(function () {
			dispatch({
				type: 'clearNotification',
				code: code
			});
		}, time);
	};
}
