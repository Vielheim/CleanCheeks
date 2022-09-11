'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      blacklisted_toilets: {
        type: Sequelize.ARRAY(Sequelize.UUID),
        allowNull: false,
        defaultValue: [],
      },
      favourited_toilets: {
        type: Sequelize.ARRAY(Sequelize.UUID),
        allowNull: false,
        defaultValue: [],
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
