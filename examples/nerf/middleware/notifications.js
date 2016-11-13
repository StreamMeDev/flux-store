'use strict';

export default function notifications (req, res, next) {
	if (res.locals.context.notifications) {
		return next();
	}

	// Initalize or load notifications
	res.locals.context.notifications = [];

	// Add notifications from query params if present
	if (req.query.notifications) {
		try {
			res.locals.context.notifications = JSON.parse(req.query.notifications);
		} catch (e) {
			// just ignore the invalid data from the url
		}
	}
	next();
}
