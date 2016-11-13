'use strict';
import UserEdit from './container.jsx';
import {createStore, bindActionCreators} from '@streammedev/flux-store';
import saveUserReducer, {saveUser} from '../../actions/save-user';
import deleteReducer, {deleteUser} from '../../actions/delete-user';
import {changeUserAvatarReducer, changeAvatar} from '../../actions/change-avatar';
import {changeUserUsernameReducer, changeUsername} from '../../actions/change-username';
import {changeUserEmailReducer, changeEmail} from '../../actions/change-email';
import clearNotificationReducer from '../../actions/clear-notification';

export default function (req, res) {
	// Create the store with the reducers
	var store = createStore({
		deleteUser: deleteReducer,
		saveUser: saveUserReducer,
		changeAvatar: changeUserAvatarReducer,
		changeEmail: changeUserEmailReducer,
		changeUsername: changeUserUsernameReducer,
		clearNotification: clearNotificationReducer
	});

	// Subscribe to state changes to render the component
	var unsubscribe = store.subscribe(function (state, oldState, action) {
		// If we just deleted this user, redirect back to the
		// listing page with our message in the url
		if (action.type === 'deleteUser' && action.status === 'success') {
			return res.redirect('/?notifications=' + JSON.stringify(state.notifications));
		}

		res.renderReactComponent(UserEdit, state);
	});

	// Add action creators and dispatch to the context/store,
	// along with other view related state initializers
	// and replace the stores state with the new object
	store.replaceState(Object.assign(res.locals.context, bindActionCreators({
		changeAvatar,
		changeEmail,
		changeUsername,
		deleteUser,
		saveUser
	}, store.dispatch), {
		dispatch: store.dispatch
	}));

	// On route change, unsubscribe the listener
	req.emitter.once('routeChange', unsubscribe);
}
