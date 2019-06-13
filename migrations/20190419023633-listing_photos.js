'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'listing_photos', 
    {
      listing_id: {
        type: Sequelize.UUID,
        foreignKey: true,
        allowNull: false
      },
      photo_url: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listing_photos');
  }
};
