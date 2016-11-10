'use strict';
var validateEmail = require('simple-email-validator');
var bodyParser = require('body-parser');
var userId = 0;
var fallbackAvatars = [1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
	return 'http://static1.creekcdn.com/frozen/images/avatars/avatar-id-' + i + '.png';
});
var users = [{
	id: userId++,
	username: 'admin',
	avatar: fallbackAvatars[0],
	email: 'test@test.com'
}];

module.exports = function (app) {
	app.use('/api', bodyParser.json());

	// Gets a paginated list of users
	app.get('/api/users', function (req, res) {
		var offset = req.query.offset || 0;
		var limit = req.query.limit || 10;
		res.status(200).json({
			users: users.slice(offset, offset + limit)
		});
	});

	// Creates a user
	app.post('/api/users', function (req, res) {
		var _errs = [];

		// Validate data
		if (!req.body.username) {
			_errs.push({
				message: 'Username is required',
				code: 'usernameReqired',
				level: 'danger',
				field: 'username'
			});
		}
		if (!req.body.email) {
			_errs.push({
				message: 'Email is required',
				code: 'emailRequired',
				level: 'danger',
				field: 'email'
			});
		}
		if (validateEmail(req.body.email) !== true) {
			_errs.push({
				message: 'Invalid email',
				code: 'invalidEmail',
				level: 'danger',
				field: 'email'
			});
		}

		// Send error response
		if (_errs.length) {
			return res.status(400).json({
				reasons: _errs
			});
		}

		// Create user object
		var u = {
			id: userId++,
			username: req.body.username,
			email: req.body.email,
			avatar: req.body.avatar || fallbackAvatars[userId % fallbackAvatars.length]
		};
		users.push(u);
		res.status(201).json(u);
	});

	// Gets a user by a given id
	app.get('/api/users/:id', function (req, res) { });

	app.post('/api/users/:id', function (req, res) { });
	app.delete('/api/users/:id', function (req, res) {
		var found = false;
		users = users.filter(function (user) {
			if (parseInt(req.params.id, 10) !== user.id) {
				return true;
			}
			found = true;
			return false;
		});
		if (!found) {
			return res.status(404).json({
				reasons: [{
					message: 'User not found',
					code: 'userNotFound',
					level: 'warning'
				}]
			});
		}
		res.status(204).send();
	});
};
