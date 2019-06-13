'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'user_message',
      {
        sending_user_id: {
          type: Sequelize.UUID,
          foreignKey: true,
          allowNull: false
        },
        receiving_user_id: {
          type: Sequelize.UUID,
          foreignKey: true,
          allowNull: false
        },
        message_id: {
          type: Sequelize.UUID,
          foreignKey: true,
          allowNull: false
        },
        listing_id: {
          type: Sequelize.UUID,
          foreignKey: true,
          allowNull: false
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_message');
  }
};
