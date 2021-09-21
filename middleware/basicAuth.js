'use strict'

const basicAuth = require('basic-auth')
const checkCredentials = require('../util/checkTASLCredentials')

const mwBasicAuth = (request, response, next) => {
  const taslCredentials = basicAuth(request)
  const validCredentials = checkCredentials(taslCredentials.name, taslCredentials.pass)

  if (!taslCredentials || !validCredentials) {
    console.log('API Authorization Failed')
    response.send({
      status_code: 401,
      status: 'Unauthorized',
      message: 'Authentication Error. Please check your Credentials'
    })
  } else {
    next()
  }
}

module.exports = mwBasicAuth
