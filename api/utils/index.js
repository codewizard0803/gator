const path = require("path");

/**
 * builds relative path of photos
 * @param {*} relativePath 
 */
function assetResolver(relativePath) {
  const assestsPath = path.resolve(__dirname, ".", "assets");
  const absoluteImagePath = path.join(assestsPath, relativePath);
  const relPathFromAssets = path.relative(assestsPath, absoluteImagePath);
  const imageURL = process.env.BACKEND_URL + "/assets/" + relPathFromAssets;
  return imageURL;
}

/**
 * @description
 * filter function for listings
 */
const filterListing = (data, type, beds, baths, priceMax, distanceMax) => {
  return data.filter(listing => {
    if( ( type && listing.housing_type.toLowerCase() !== type) )
      console.log('invalid type')
    else if( ( beds && listing.bedroom < beds) )
      console.log('invalid bedroom')
    else if( ( baths && listing.bathroom < baths) )
      console.log('invalid bathroom')
    else if( ( priceMax && listing.price > priceMax) )
      console.log('invalid price')
    else if( ( distanceMax && listing.distance > distanceMax) )
      console.log('invalid distance')
    else
      return listing
  })
}

const searchQueueBuilder = (queue) => {
  let dbQueue = null
  if(queue.length === 0 || queue === "all") {
    dbQueue = `SELECT * FROM listings`
  } else if( !isNaN(queue) ) {
    dbQueue = `SELECT * FROM listings WHERE zipcode=$1`
  } else {
    dbQueue = `SELECT * FROM listings WHERE LOWER(city)=LOWER($1)`
  }
  return dbQueue
}

module.exports = {
  assetResolver,
  filterListing,
  searchQueueBuilder
}