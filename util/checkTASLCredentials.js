'use strict'

const checkCredentials = (username, password) => {
  const truthyEvaluator = true
  const checkUsername = compareValues(username, process.env.TASL_USERNAME)
  const checkPassword = compareValues(password, process.env.TASL_PASSWORD)

  if (checkUsername !== truthyEvaluator || checkPassword !== truthyEvaluator) {
    return false
  }

  return true
}

module.exports = checkCredentials

function compareValues(providedValue, storedValue) {
  return providedValue === storedValue ? true : false
}
