'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // for uuid_generate_v4()
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    ),
      await queryInterface.createTable('UserToiletPreferences', {
        user_id: {
          type: Sequelize.STRING,
          primaryKey: true,
          references: {
            model: {
              tableName: 'Users',
            },
            key: 'id',
          },
        },
        toilet_id: {
          type: Sequelize.UUID,
          primaryKey: true,
          references: {
            model: {
              tableName: 'Toilets',
            },
            key: 'id',
          },
        },
        type: {
          type: Sequelize.ENUM('FAVOURITE, BLACKLIST'),
          allowNull: false,
          values: ['FAVOURITE', 'BLACKLIST'],
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
