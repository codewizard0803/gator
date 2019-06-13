'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      return queryInterface.createTable(
        'conversations',
        { 
          conversations_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            allowNull: false
          },
          listing_id: {
            type: Sequelize.UUID,
            foreignKey: true,
            allowNull: false
          },
          owner_id: {
            type: Sequelize.UUID,
            foreignKey: true,
            allowNull: false
          },
          renter_id: {
            type: Sequelize.UUID,
            foreignKey: true,
            allowNull: false
          }
        }
      );
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('conversations');
  }
};
