'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      return queryInterface.createTable(
        'listings',
        {
          listing_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            allowNull: false
          },
          user_id: {
            type: Sequelize.UUID,
            foreignKey: true,
            allowNull: false
          },
          address: {
            type: Sequelize.STRING,
            allowNull: false
          },
          city:{
            type: Sequelize.STRING,
            allowNull: false
          },
          state: {
            type: Sequelize.STRING,
            allowNull: false
          },
          zipcode: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          date_created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal(`NOW()`),
            allowNull: false
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          bedroom: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          bathroom: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          squarefoot: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          price: {
            type: Sequelize.DOUBLE,
            allowNull: false
          },
          confirmation: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
          },
          distance: {
            type: Sequelize.FLOAT,
            allowNULL: false
          },
          housing_type: {
            type: Sequelize.STRING,
            allowNull: false
          }
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listings')
  }
};
