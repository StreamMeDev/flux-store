'use strict';
import nets from 'nets';

module.exports = function (req, res, next) {
	if (res.locals.context.users) {
		return next();
	}

	// Initalize or load notifications
	res.locals.context.notifications = res.locals.context.notifications || [];

	// Fetch users
	nets({
		method: 'GET',
		url: 'http://localhost:1337/api/users',
		json: true
	}, function (err, resp, body) {
		// Add notifications for errors
		if (err || resp.statusCode !== 200) {
			res.locals.context.notifications.push((body && body.reasons) || {
				message: 'Error creating user: ' + err.code,
				code: 'userCreatedError',
				level: 'error'
			});
		}

		res.locals.context.users = body.users || [];
		next();
	});
};
