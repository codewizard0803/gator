/**
 * Test route page
 */

const express = require('express')
const router = express.Router()

const { db } = require('../db')

// testing connection
router.get('/', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' })
})

// test db connection
router.get('/database', (req, res) => {
	db.any(`INSERT INTO test_table ("testString") VALUES ('Hello at ${Date(Date.now())}')`)
		.then( _ => db.any(`SELECT * FROM test_table`) )
		.then( results => res.json( results ) )
		.catch( error => {
      console.log( error )
      res.json({ error })
    })
})

// test db user raw
router.get('/database/fake', (req, res) => {
	db.any(`INSERT INTO users (firstname, lastname, email, password) 
						VALUES ('peter', 'le', 'stuff.email', 'password1')`)
		.then( _ => db.any(`SELECT * FROM users`) )
		.then(results => res.json( results ) )
		.catch( error => {
			console.log( error )
			res.json({ error })
		})
})

module.exports = router