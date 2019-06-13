const express = require('express')
const router = express.Router()

const { db } = require('../db')

const bcrypt = require('bcryptjs')

const { authenticate } = require('../authentification/passport')
const isAuthenticated = require('../authentification/isAuthenticated')
const validator = require('../authentification/validate')

const SALT = 8

/**
 * get list of users
 */
router.get('/', isAuthenticated, (req, res) => {
    db.any(`SELECT * FROM users`)
    .then(result => res.json(result))
    .catch(error => {
      console.log(error)
      res.json({ error })
    })
})

/**
 * registers a user
 */
router.post('/register', (req, res, next) => {
  const { email, firstname, lastname, password } = req.body

  if( !validator.inputValidation(email, firstname, lastname, password, res)) return

  bcrypt.hash(password, SALT, (err, hash) => {
    db.one(`INSERT INTO users (email, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING user_id`,
    [email, firstname, lastname, hash])
    .then(userid => {
      req.login(userid, err => {
        if(err) {
          return next(err)
        }
        res.json(userid)
      })
    })
    .catch(err => {
      validator.dbInvalidHandler(err, res)
    })
  })
})

router.post('/login', authenticate)

router.post('/logout', (req, res) => {
  req.logout()
  res.send('logged out')
})

router.get('/protected', isAuthenticated, (req, res) => {
  res.send('inside of protected route')
})

/**
 * get boolean if user is logged in as admin
 */
router.get('/admin', isAuthenticated, async (req, res) => {
  const yourId = req.user.user_id

  try {
    const valid = await db.one(`SELECT is_admin FROM users WHERE user_id=$1`, [yourId])
    if(valid.is_admin)
      res.send(true)
    else
      res.send(false)
  }
  catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})

/**
 * delete user based on user id
 */
router.delete('/:userid', isAuthenticated, async (req, res) => {
  const userId = req.params.userid
  const yourId = req.user.user_id

  try {
    const valid = await db.one(`SELECT is_admin FROM users WHERE user_id=$1`, [yourId])
    if(!valid.is_admin) { throw new Error('not an admin') }

    db.none(`DELETE FROM users WHERE user_id=$1`, [userId])
    res.sendStatus(204)
  }
  catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})

module.exports = router
