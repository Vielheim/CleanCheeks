'use strict';

module.exports = {
  async up(queryInterface) {
    const users = [
      {
        id: 'testuser',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
