const express = require('express')
const router = express.Router()

const { db } = require('../db')

const { assetResolver, filterListing, searchQueueBuilder } = require('../utils')
const upload = require('../../config/photoStorage')
const isAuthenticated = require('../authentification/isAuthenticated')
const validator = require('../authentification/validate')

/**
 * get list of all listings
 */
router.get('/', (req, res) => {
  db.any(`SELECT * FROM listings`)
  .then(listing => {
    res.send(listing)
  })
  .catch(error => {
    console.log(error)
    res.json({ error })
  })
})

/**
 * post new listing
 */
router.post('/', isAuthenticated, (req, res) => {
  const { address, city, state, zipcode, bedroom, bathroom, squarefoot, price, distance ,housing_type, description } = req.body
  const userId = req.user.user_id

  const listingArr = [userId, address, city, state, zipcode, bedroom, bathroom, squarefoot, price, distance ,housing_type, description]

  if( validator.postListing(listingArr, res) ) return

  db.one(`INSERT INTO listings(
    user_id, address, city, state, zipcode, bedroom, bathroom, squarefoot, price, distance ,housing_type, description
      ) VALUES(
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning listing_id`,
      listingArr
    )
    .then( listingId => {
      res.status(201)
      res.send(listingId)
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(400)
    })
})

/**
 * get listing based on listing id
 */
router.get('/retrieve/:listingId', (req, res) => {
  const listingId = req.params.listingId
  db.one(`SELECT * from listings WHERE listing_id=$1`, [listingId])
  .then(listing => {
    res.send(listing)
  })
  .catch(error => {
    console.log(error)
    res.sendStatus(204)
  })
})

/**
 * get listing id based on owner id 
 */
router.get('/owner/:listingId', async (req, res) => {
  const listingId = req.params.listingId

  try {
    const ownerList = await db.any(`SELECT listing_id FROM listings WHERE user_id=$1`, [listingId])
    res.send(ownerList)
  }
  catch ( err ) {
    res.sendStatus(400)
  }
})

/**
 * get listing according to tag name
 */
router.get('/search-tags/:tag', (req, res) => {
    const tag = req.params.tag
    db.task(t => {
      return t.one(`SELECT tag_id FROM tag WHERE tag_name=$1`,[tag])
      .then(tags_id => {
        return t.any(`SELECT listing_id FROM tag_relation WHERE tag_id=$1`, [tags_id.tag_id])
        .then(listingRelation => {
          const listingids = listingRelation.map( listings => { return listings.listing_id })
          return t.any(`SELECT * FROM listings WHERE listing_id IN ($1:csv)`,[listingids])
        })
      })
    })
    .then(listings => {
      res.send(listings)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(204)

    })
  })

  /**
   * get tag names according to listing id
   */
  router.get('/tags/:listingId', (req, res) => {
    const listingId = req.params.listingId

    db.task(t => {
      return t.any(`SELECT tag_id FROM tag_relation WHERE listing_id=$1`, [listingId])
      .then(tagIdObject => {
        const tagIdList = tagIdObject.map( tagObject => { return tagObject.tag_id })
        return t.any(`SELECT tag_name FROM tag WHERE tag_id IN ($1:csv)`, [tagIdList])
      })
    })
    .then(tagName => {
      res.send(tagName)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(204)
    })
  })

/**
 * post tag to listing
 */
router.post('/tags/:tagsQueue', isAuthenticated, async (req, res) => {
  const tagsQueue = req.params.tagsQueue
  const { listingId } = req.body

  const tagList = tagsQueue.split('+')

  try {
    for(let tag of tagList) {
      let tagId = await db.any(`SELECT tag_id FROM tag WHERE tag_name=$1`, [tag])
      if(tagId === undefined || tagId.length == 0) {
        tagId = await db.any(`INSERT INTO tag(tag_name) VALUES ($1) RETURNING tag_id`, [tag])
      }
      await db.none(`INSERT INTO tag_relation(tag_id, listing_id) VALUES ($1, $2)`, [tagId[0].tag_id, listingId])
    }
    res.sendStatus(201)
  }
  catch(err) {
    console.log(err)
    res.sendStatus(400)
  }
})

/**
 * get listing based on zipcode
 */
router.get('/zipcodes/:zipcode', (req, res) => {
  const zipcode = req.params.zipcode

  db.any(`SELECT * FROM listings WHERE zipcode=$1`, [zipcode])
  .then(listings => {
    res.send(listings)
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(204)
  })
})

/**
 * get photo url based on listing id
 */
router.get('/photos/:listingId', (req, res) => {
  const listingId = req.params.listingId

  db.any(`SELECT photo_url FROM listing_photos WHERE listing_id=$1`, [listingId])
  .then(photos => {
    if(photos.length === 0) throw new Error('no photo')
    photos.forEach(p => {
      const photo = p.photo_url
      p.photo_url = assetResolver(photo)
    })

    res.send(photos)
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(204)
  })
})

/**
 * post photos according to listing id
 */
router.post('/photos/upload/:listingid', isAuthenticated, upload.array('photo', 5), (req, res) => {
  const listingid = req.params.listingid
  const relativePathList = req.files.map(file => file.path.substring(10) )

  if(!req.files) {
    console.log('no files received')
    res.status(400)
    res.send('no files received')
    return
  }

  const promises = relativePathList.map(path => db.none(`INSERT INTO listing_photos(listing_id, photo_url) VALUES( (SELECT listing_id FROM listings WHERE listing_id=$1), $2 )`, [listingid, path]) )
  Promise.all(promises).then(() => {
    res.sendStatus(201)
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})

/**
 * get search route
 * implements search function given 
 */
router.get('/search/', (req, res) => {
  let { queue } = req.query
  const { type, beds, baths, priceMax, distanceMax } = req.query

  queue = queue.replace("+", " ")

  let dbQueue = searchQueueBuilder(queue)

  db.any(dbQueue, [queue])
  .then(data => {
    const filteredListings = filterListing(data, type, beds, baths, priceMax, distanceMax)

    res.send(filteredListings)
  })
  .catch(error => {
    console.log(error)
    res.sendStatus(204)
  })
})

/**
 * get uncomfirmed listings for addmin
 */
router.get('/incomplete', isAuthenticated, async (req, res) => {
  const userId = req.user.user_id

  try {
    const valid = await db.one(`SELECT is_admin FROM users WHERE user_id=$1`, [userId])
    if(!valid.is_admin) { throw new Error('not an admin') }

    const listing = await db.any(`SELECT * FROM listings WHERE confirmation=false`)
    res.send(listing)
  }
  catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})

/**
 * put route to confirm listing based on listing id
 */
router.put('/confirm/:listingid', isAuthenticated, async (req, res) => {
  const listingid = req.params.listingid
  const userId = req.user.user_id
  
  try {
    const valid = await db.one(`SELECT is_admin FROM users WHERE user_id=$1`, [userId])
    if(!valid.is_admin) { throw new Error('not an admin') }

    await db.none('UPDATE listings SET confirmation=TRUE WHERE listing_id=$1', [listingid])
    res.status(204)
    res.send('Successfully Updated Listings')
  }
  catch (err) {
    console.log(err)
    res.sendStatus(401)
  }
})

/**
 * delete listing
 */
router.delete('/:listingid', isAuthenticated, async (req, res) => {
  const listingId = req.params.listingid
  const yourId = req.user.user_id
  
  try {
    const valid = await db.one(`SELECT is_admin FROM users WHERE user_id=$1`, [yourId])
    if(!valid.is_admin) { throw new Error('not an admin') }

    await db.none(`DELETE FROM tag_relation WHERE listing_id=$1`, [listingId])
    await db.none(`DELETE FROM listings WHERE listing_id=$1`, [listingId])
    
    res.sendStatus(204)
  }
  catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})

module.exports = router
