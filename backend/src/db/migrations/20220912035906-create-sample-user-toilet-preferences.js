'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserToiletPreferences', {
      user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      toilet_id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM('FAVOURITE, BLACKLIST'),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('UserToiletPreferences');
  },
};
