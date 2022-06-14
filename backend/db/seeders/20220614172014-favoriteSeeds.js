"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Favorites",
      [
        {
          userId: 3,
          spotId: 1,
        },
        {
          userId: 2,
          spotId: 2,
        },
        {
          userId: 3,
          spotId: 3,
        },
        {
          userId: 1,
          spotId: 4,
        },
        {
          userId: 1,
          spotId: 5,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Favorites", null, {});
  },
};
