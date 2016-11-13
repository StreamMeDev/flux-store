'use strict';
import nets from 'nets';
import {clearNotification} from './clear-notification';

export default function deleteUserFromListReducer (state, action) {
	switch (action.status) {
		case 'loading':
			state.loading = true;
			break;
		case 'error':
			state.loading = false;
			state.notifications = action.reasons || [];
			break;
		case 'success':
			state.loading = false;
			state.notifications = action.reasons || [];
			state.users = state.users.filter(function (user) {
				return user.id !== parseInt(action.userId, 10);
			});
			break;
	}
	return state;
}

export function deleteUserReducer (state, action) {
	switch (action.status) {
		case 'loading':
			state.loading = true;
			break;
		case 'error':
			state.loading = false;
			state.notifications = action.reasons || [];
			break;
		case 'success':
			state.loading = false;
			state.notifications = action.reasons || [];
			break;
	}
	return state;
}

export function deleteUser (userId) {
	return function (dispatch) {
		dispatch({
			type: 'deleteUser',
			status: 'loading'
		});

		nets({
			method: 'DELETE',
			url: '/api/users/' + userId,
			json: {}
		}, function (err, resp, body) {
			if (err || resp.statusCode !== 204) {
				dispatch(clearNotification('userDeletedError'));
				return dispatch({
					type: 'deleteUser',
					status: 'error',
					userId: userId,
					reasons: (body && body.reasons) || [{
						message: 'Error deleting user: ' + err.code,
						code: 'userDeletedError',
						level: 'error'
					}]
				});
			}

			dispatch(clearNotification('userDeleted'));
			return dispatch({
				type: 'deleteUser',
				status: 'success',
				userId: userId,
				reasons: (body && body.reasons) || [{
					message: 'User deleted.',
					code: 'userDeleted',
					level: 'warning'
				}]
			});
		});
	};
}
