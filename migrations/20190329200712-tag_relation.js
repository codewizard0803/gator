'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable(
          'tag_relation',
          {
            tag_id: {
              type: Sequelize.UUID,
              foreignKey: true,
              references: {
                model:'tag',
                key:'tag_id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
              allowNull: false
            },
            listing_id: {
              type: Sequelize.UUID,
              foreignKey: true,
              references: {
                model:'listings',
                key:'listing_id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
              allowNull: false
            }
          }
        )
      })
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('tag_relation')
    }
  };
