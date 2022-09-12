'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // for uuid_generate_v4()
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    ),
      await queryInterface.createTable('Users', {
        id: {
          primaryKey: true,
          type: Sequelize.STRING,
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
    await queryInterface.dropTable('Users');
  },
};
