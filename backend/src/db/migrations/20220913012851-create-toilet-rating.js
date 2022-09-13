'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // for uuid_generate_v4()
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    ),
      await queryInterface.createTable('ToiletRatings', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          validate: {
            isUUID: 4,
          },
        },
        user_id: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: {
              tableName: 'Users',
            },
            key: 'id',
          },
        },
        toilet_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: {
              tableName: 'Toilets',
            },
            key: 'id',
          },
        },
        type: {
          type: Sequelize.ENUM('CLEAN', 'DIRTY'),
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
    await queryInterface.dropTable('ToiletRatings');
  },
};
