/**
 * helper functions for validation
 */

const isemail = require('isemail')

const validateEmail = (email, res) => {
  if( email === undefined || !isemail.validate(email) ) {
    console.log('invalid email: ' + email)
    res.status(400)
    res.send('invalid email')

    return false
  }
  return true
}

const validateName = (first, last, res) => {
  if(typeof first !== 'string' || first.length === 0 ||
      typeof last !== 'string' || last.length === 0) {
    console.log('invalid name input')
    res.status(400)
    res.send('invalid name input')

    return false
  }
  return true
}

const validatePassword = (password, res) => {
  if(typeof password !== 'string' || password.length < 6) {
    console.log('invalid password length')
    res.status(400)
    res.send('invalid password length')
    return false
  }
  return true
}

const inputValidation = (email, first, last, password, res) => {
  return ( validateEmail(email, res) && validateName(first, last, res) && validatePassword(password, res) )
}

const postListing = (listingArr, res) => {
  if( !listingArr.every(x => typeof x != 'undefined') ) {
    console.log('found undefined')
    res.sendStatus(400)
    return true
  }
  return false
}

const dbInvalidHandler = (err, res) => {
  if(err.constraint === 'users_email_key') {
    console.log('inside of email err: ' + err.constraint)
    res.status(400)
    res.send('email already used')
  } else if(err.column === 'firstname' || err.column === 'lastname') {
    console.log('error at: ' + err.column)
    res.status(400)
    res.send('invalid ' + err.column) 
  } else {
    console.log('something else went wrong')
    res.status(400)
    res.send('something else went wrong')
  }
}

module.exports = {
  inputValidation,
  dbInvalidHandler,
  postListing
}