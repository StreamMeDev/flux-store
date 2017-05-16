const createStore = require('./lib/create-store')
module.exports = createStore
module.exports.createStore = createStore
module.exports.Store = require('./lib/store')
module.exports.bindActionCreators = require('./lib/bind-action-creators')
module.exports.combineReducers = require('./lib/combine-reducers')
