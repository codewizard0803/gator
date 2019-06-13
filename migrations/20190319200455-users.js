'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      return queryInterface.createTable(
        'users',
        {
          user_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            allowNull: false
          },
          firstname: {
            type: Sequelize.STRING,
            allowNull: false
          },
          lastname: {
            type: Sequelize.STRING,
            allowNull: false
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false
          },
          is_admin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
          }
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
}
