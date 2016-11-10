'use strict';
import UserList from './container.jsx';
import Store from '@streammedev/flux-store';
import createUserReducer, {createUser} from '../../actions/create-user';
import deleteUserReducer, {deleteUser} from '../../actions/delete-user';
import changeAvatarReducer, {changeAvatar} from '../../actions/change-avatar';
import changeUsernameReducer, {changeUsername} from '../../actions/change-username';
import changeEmailReducer, {changeEmail} from '../../actions/change-email';
import clearNotificationReducer from '../../actions/clear-notification';

module.exports = function (req, res) {
	// initalize ui notifications
	res.locals.context.notifications = res.locals.context.notifications || [];

	// Add action handlers
	res.locals.context.changeAvatar = function (value) {
		store.dispatch(changeAvatar(value));
	};
	res.locals.context.changeEmail = function (value) {
		store.dispatch(changeEmail(value));
	};
	res.locals.context.changeUsername = function (value) {
		store.dispatch(changeUsername(value));
	};
	res.locals.context.createUser = function (user) {
		store.dispatch(createUser(user));
	};
	res.locals.context.deleteUser = function (userId) {
		store.dispatch(deleteUser(userId));
	};

	// Create the store
	var store = new Store(res.locals.context, {
		createUser: createUserReducer,
		deleteUser: deleteUserReducer,
		changeAvatar: changeAvatarReducer,
		changeEmail: changeEmailReducer,
		changeUsername: changeUsernameReducer,
		clearNotification: clearNotificationReducer
	});

	// Render the component
	function render (state) {
		res.renderReactComponent(UserList, Object.assign(state, {
			dispatch: store.dispatch
		}));
	}

	// Subscribe to state changes to render the component
	store.subscribe(function (state) {
		render(state);
	});

	// Initial render
	render(store.getState());
};
