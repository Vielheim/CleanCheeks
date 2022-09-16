'use strict';

module.exports = {
  async up(queryInterface) {
    const toilets = require('../../../../data/toilets.json');
    let toiletsArray = [];
    toilets.forEach((t) => {
      toiletsArray.push({
        ...t,
        num_ratings: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('Toilets', toiletsArray);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Toilets', null, {});
  },
};
