'use strict'
import nets from 'nets'

export default function getUsers (req, res, next) {
  if (res.locals.context.users) {
    return next()
  }

  // Fetch users
  nets({
    method: 'GET',
    url: 'http://localhost:1337/api/users',
    json: true
  }, function (err, resp, body) {
    // Add notifications for errors
    if (err || resp.statusCode !== 200) {
      res.locals.context.notifications = res.locals.context.notifications.concat((body && body.reasons) || [{
        message: 'Error getting users: ' + ((err && err.code) || resp.statusCode),
        code: 'getUsersError',
        level: 'error'
      }])
    }

    res.locals.context.users = body.users || []
    next()
  })
}
