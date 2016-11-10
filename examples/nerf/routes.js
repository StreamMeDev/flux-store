'use strict';
var sharedContext = require('shared-context');
var reactExpressMiddleware = require('react-express-middleware');
var getUsers = require('./middleware/get-users');
var list = require('./handlers/list');
var edit = require('./handlers/edit');

module.exports = function (app) {
	app.use(sharedContext(), reactExpressMiddleware({
		element: 'app'
	}));
	app.get('/', getUsers, list);
	app.get('/:user', edit);
};
