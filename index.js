var createStore = require('./lib/create-store').createStore;
module.exports = createStore;
module.exports.createStore = createStore;
module.exports.Store = require('./lib/store').Store;
module.exports.bindActionCreators = require('./lib/bind-action-creators').bindActionCreators;
