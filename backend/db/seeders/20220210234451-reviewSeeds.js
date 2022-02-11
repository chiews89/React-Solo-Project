'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [
    {
     userId: 1,
     spotId: 1,
     rating: 3,
     review: "We enjoyed our stay at this wonderful victorian home. The amenities are as described and it is a quick walk to anything you might need. The only thing negative I would say was that it did note feel very safe walking to this place at night, although we felt safe in the neighborhood during the day",
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
    userId: 2,
    spotId: 2,
    rating: 5,
    review: "This place is truly one of a kind. We loved our time in San Francisco and next time we come we will definitely stay here again",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    spotId: 3,
    rating: 4,
    review: "This loft was exactly what we were looking for. It was spacious, clean with great little touches from the host. We did enjoy some time in the courtyard as well after a long day walking around the city. Definitely highly recommend staying here.",
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
