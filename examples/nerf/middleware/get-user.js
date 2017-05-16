'use strict'
import nets from 'nets'

export default function getUser (req, res, next) {
  if (res.locals.context.users) {
    return next()
  }

  // Fetch users
  nets({
    method: 'GET',
    url: 'http://localhost:1337/api/users/' + req.params.id,
    json: true
  }, function (err, resp, body) {
    // Add notifications for errors
    if (err || resp.statusCode !== 200) {
      res.locals.context.notifications = res.locals.context.notifications.concat((body && body.reasons) || [{
        message: 'Error getting user: ' + ((err && err.code) || resp.statusCode),
        code: 'getUserError',
        level: 'error'
      }])
    } else {
      res.locals.context.user = body
    }
    next()
  })
}
