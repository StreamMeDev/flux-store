'use strict';
var router = require('nighthawk')({
	parseQuerystring: true
});
require('./routes')(router);
router.use(function (err, req, res, next) {
	console.error(err.stack);
});
router.listen();
