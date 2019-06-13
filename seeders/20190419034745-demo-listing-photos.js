'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('listing_photos', [{
      listing_id: '88af8b1e-c0c9-4084-8304-256b2ae0c8b8',
      photo_url: '/test1/sfsu.jpg'
    },
    {
      listing_id: '88af8b1e-c0c9-4084-8304-256b2ae0c8b9',
      photo_url: '/test2/salesforce.jpg'
    },
    {
      listing_id: '88af8b1e-c0c9-4084-8304-256b2ae0c8b9',
      photo_url: '/test2/salesforce2.jpg'
    },
    {
      listing_id: '89aa8b1e-c0c9-4084-8304-256b2ae0c8b8',
      photo_url: '/item3/prettyHouse.jpg'
    },
    {
      listing_id: '81afcb1e-c0c9-4084-8304-256b2ae0c8b1',
      photo_url: '/item4/nicerHouseCuzLOL.jpg'
    },
    {
      listing_id: '83df8b1e-c0c9-4084-8304-256b2ae0c8b3',
      photo_url: '/item5/clifton-house-project-arch.jpg'
    },
    {
      listing_id: '83df8b1e-c0c9-4084-8304-256b2ae0c8b3',
      photo_url: '/item5/clifton-house-project.jpg'
    },
    {
      listing_id: '85bf8b1e-c0c9-4084-8304-256b2ae0c8b5',
      photo_url: '/item6/1426016553733.jpg'
    },
    {
      listing_id: '81cf8b1e-c0c9-4084-8304-256b2ae0c8b1',
      photo_url: '/item7/Featured-Image.jpg'
    },
    {
      listing_id: '87ae8b1e-c0c9-4084-8304-256b2ae0c8b7',
      photo_url: '/item8/exgpPAfS.jpg'
    },
    {
      listing_id: '87af8b1e-c0c9-4084-8304-256b2ae0c8b7',
      photo_url: '/item9/coach-house.jpg'
    },
    {
      listing_id: '81af8b1e-c0c9-4084-8304-256b2ae0c8b6',
      photo_url: '/item10/calvert-house-woodley-park.jpg'
    },
    {
      listing_id: '86cf8b1e-c0c9-4084-8304-256b2ae0c8b2',
      photo_url: '/item11/72145856.jpg'
    },
    {
      listing_id: '84cf8b1e-c0c9-4084-8304-256b2ae0c8b3',
      photo_url: '/item12/kitchen-dining-1.jpg'
    },
    {
      listing_id: '82cf8b1e-c0c9-4084-8304-256b2ae0c8b4',
      photo_url: '/item13/Shore-House-Apartments.jpg'
    },
    {
      listing_id: '81bf8b1e-c0c9-4084-8304-256b2ae0c8b5',
      photo_url: '/item14/someImage.jpg'
    },
    {
      listing_id: '88bf8b1e-c0c9-4084-8304-256b2ae0c8b3',
      photo_url: '/item15/Gramercy-Townhouse.jpg'
    },
    {
      listing_id: '84af8b1e-c0c9-4084-8304-256b2ae0c8b5',
      photo_url: '/item16/test_image.jpg'
    },
    {
      listing_id: '84af8b1e-c0c9-4084-8304-256b2ae0c8b5',
      photo_url: '/item16/Tree-House.jpg'
    },
    {
      listing_id: 'babb0ebc-2923-416c-88e0-d415a5fdcbf5',
      photo_url: 'snowHouse.jpg'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('listings_photos', null, {});
  }
};
