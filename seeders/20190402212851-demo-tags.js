'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tag', [{
      tag_id: '11bf8b1e-d0c9-3384-8304-216b2ae0c8b8',
      tag_name: 'kitchen'
    },
    {
      tag_id: '11cf8b1e-c0c9-3844-8304-736b2ae0c8b2',
      tag_name: 'pets'
    },
    {
      tag_id: '11df8b1e-d0c8-8344-8304-336b2ae0c8b3',
      tag_name: 'living room'
    },
    {
      tag_id: '11cf8b1e-c0c9-3844-8304-736b2ae0c8b4',
      tag_name: 'parking'
    },
    {
      tag_id: '11ef8b1a-d0c9-3384-8304-216b2ae0c8b1',
      tag_name: 'haunted'
    },
    {
      tag_id: '13ef8b1a-d0c2-3384-8304-216b2ae0c8c1',
      tag_name: 'laundry'
    },
    {
      tag_id: '12ef8b1a-d0c9-3384-8304-216b2ae0c8a4',
      tag_name: 'no smoking'
    },
    {
      tag_id: '16ef8b1a-d0c9-3384-8304-216b2ae0c8c6',
      tag_name: 'garage'
    },
    {
      tag_id: '15ef8b1a-d0c9-3384-8304-216b2ae0c8b5',
      tag_name: 'pool'
    },
    {
      tag_id: '12ef8b1a-d0c9-3384-8304-216b2ae0c8b5',
      tag_name: 'carport'
    },
    {
      tag_id: '13ef8a1a-d0c9-3384-8304-216b2ae0c8b2',
      tag_name: 'backyard'
    },
    {
      tag_id: '17ef8b1a-d0c9-3384-8304-216b2ae0c8b2',
      tag_name: 'wheelchair'
    },
    {
      tag_id: '19ef8b1a-d0c9-3384-8304-216b2ae0c8c2',
      tag_name: 'gym'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tag', null, {});
  }
};
