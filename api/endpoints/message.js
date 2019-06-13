/**
 * message route
 */

const express = require('express')
const router = express.Router()

const { db } = require('../db')

const isAuthenticated = require('../authentification/isAuthenticated')

/**
 * create new message / conversation
 */
router.post('/newMessage', isAuthenticated, async (req, res) => {
  const { message, listingId } = req.body
  const userId = req.user.user_id

  try {
    const ownerId = await db.one(`SELECT user_id FROM listings WHERE listing_id=$1`, [listingId])
    if(ownerId.user_id === userId) {
      throw new Error('owner cannot message themselves')
    }
    const onGoingChat = await db.any(`SELECT * FROM conversations WHERE listing_id=$1 AND renter_id=$2`, [listingId, userId])
    if(onGoingChat.length === 0) {
      await db.none(`INSERT INTO conversations(renter_id, owner_id, listing_id) VALUES($1, $2, $3)`, [userId, ownerId.user_id, listingId])
    }

    const messageId = await db.one(`INSERT INTO message(message, owner_id) VALUES($1, $2) RETURNING message_id`, [message, userId])
    await db.none(`INSERT INTO user_message(sending_user_id, receiving_user_id, message_id, listing_id) VALUES($1, $2, $3, $4)`, [userId, ownerId.user_id,messageId.message_id, listingId])

    res.send('sent init message')
  }
  catch(err) {
    console.log(err)
    res.sendStatus(400)
  }
})

/**
 * get list of messages in a conversation
 */
router.get('/receive/:listingId/:recepientId', isAuthenticated, async (req, res) => {
  const { listingId, recepientId } = req.params
  const userId = req.user.user_id

  try {
    const messageIdObject = await db.any(`SELECT message_id FROM user_message WHERE listing_id=$1 AND 
    ( (sending_user_id=$2 AND receiving_user_id=$3) OR (sending_user_id=$3 AND receiving_user_id=$2) )`, 
    [listingId, userId, recepientId])

    const messageIdList = messageIdObject.map(messageId => messageId.message_id)
    const messageList = await db.any(`SELECT * FROM message WHERE message_id IN ($1:csv)`, [messageIdList])
    res.send(messageList)
  }
  catch(err) {
    console.log(err)
    res.sendStatus(400)
  }
})

/**
 * sends a message
 */
router.post('/send', isAuthenticated, async (req, res) => {
  const { message, listingId, recepientId } = req.body
  const userId = req.user.user_id

  try {
    const messageId = await db.one(`INSERT INTO message(message, owner_id) VALUES($1, $2) RETURNING message_id`, [message, userId])
    await db.none(`INSERT INTO user_message(sending_user_id, receiving_user_id, listing_id, message_id) VALUES($1, $2, $3, $4)`, 
    [userId, recepientId, listingId, messageId.message_id])

    res.status(201)
    res.send('sent message')
  }
  catch(err) {
    console.log(err)
    res.sendStatus(400)
  }
})

/**
 * get list of conversations
 */
router.get('/myMessages', isAuthenticated, async (req, res) => {
  const userId = req.user.user_id

  try {
    const messageList = await db.any(`SELECT * FROM conversations WHERE owner_id=$1 OR renter_id=$1`, [userId])
    res.send(messageList)
  }
  catch(err) {
    console.log(err)
    res.sendStatus(400)
  }
})

module.exports = router