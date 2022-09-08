'use strict';

module.exports = {
  async up(queryInterface) {
    const toilets = require('../seed.json');
    let toiletsArray = [];
    toilets.forEach((t) => {
      toiletsArray.push({
        building: t['building'],
        description: t['description'],
        floor: t['floor'],
        longitude: t['longitude'],
        latitude: t['latitude'],
        num_seats: t['num_seats'],
        num_squats: t['num_squats'],
        cleanliness: t['cleanliness'],
        type: t['type'],
        utilities: t['utilities'],
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
