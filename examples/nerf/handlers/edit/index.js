'use strict';
var isBrowser = require('is-browser');
var UserList = require('./container.jsx');
var Store = require('@streammedev/flux-store');

module.exports = function (req, res) {
	res.renderReactComponent(UserList, res.locals.context);

	if (isBrowser) {
		var store = new Store(res.locals.context);
		console.log(store);
	}
};
