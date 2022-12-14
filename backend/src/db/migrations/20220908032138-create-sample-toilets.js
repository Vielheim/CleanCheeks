'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // for uuid_generate_v4()
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    ),
      await queryInterface.createTable('Toilets', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          primaryKey: true,
          validate: {
            isUUID: 4,
          },
        },
        building: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        floor: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        longitude: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        latitude: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        num_seats: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            min: 0,
          },
        },
        num_squats: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            min: 0,
          },
        },
        cleanliness: {
          type: Sequelize.DOUBLE,
          defaultValue: 0,
          allowNull: false,
          validate: {
            max: 1,
            min: -1,
          },
        },
        num_ratings: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false,
          validate: {
            min: 0,
          },
        },
        type: {
          type: Sequelize.ENUM('MALE', 'FEMALE', 'HANDICAP'),
          allowNull: false,
        },
        utilities: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false,
          values: ['SHOWERS', 'FRAGRANCE', 'BIDETS', 'WATERCOOLER'],
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

  down: async (queryInterface) => {
    await queryInterface.dropTable('Toilets');
  },
};
