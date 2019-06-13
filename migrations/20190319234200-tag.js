'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      return queryInterface.createTable(
        'tag',
        {
          tag_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            allowNull: false
          },
          tag_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          }
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tag')
  }
};
