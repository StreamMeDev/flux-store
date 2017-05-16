'use strict'
import EventEmitter from 'events'
import sharedContext from 'shared-context'
import reactExpressMiddleware from 'react-express-middleware'
import notifications from './middleware/notifications'
import getUsers from './middleware/get-users'
import getUser from './middleware/get-user'
import list from './handlers/list'
import edit from './handlers/edit'

module.exports = function (app) {
  // Create an event emitter to emit route
  // change events, @TODO switch to built in
  // router events once they are merged https://github.com/pillarjs/router/pull/49
  var emitter = new EventEmitter()
  app.use(function (req, res, next) {
    req.emitter = emitter
    req.emitter.emit('routeChange')
    next()
  })

  // Add shared middleware
  app.use(sharedContext(), reactExpressMiddleware({
    element: 'app'
  }), notifications)

  // Routes
  app.get('/', getUsers, list)
  app.get('/user/:id', getUser, edit)
}
