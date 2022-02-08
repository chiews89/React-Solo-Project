"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Spots",
      [
        {
          userId: 1,
          image: '/images/smallhouse1.jpg',
          description: "A Beautiful small sized house to spend some quiet nights in.",
          city: "Oakland",
          state: "California",
          price: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          image: '/images/mediumhouse1.jpg',
          description: "A beautiful medium sized house for you and your family.",
          city: "Oakland",
          state: "California",
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          image: '/images/largehouse1.jpg',
          description: "A Spacious large sized house for you to have a big gathering in.",
          city: "Oakland",
          state: "California",
          price: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          image: '/images/smallhouse2.jpg',
          description: "A Beautiful small sized house to spend some quiet nights in.",
          city: "Alameda",
          state: "California",
          price: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          image: '/images/mediumhouse2.jpg',
          description: "A beautiful medium sized house for you and your family.",
          city: "Alameda",
          state: "California",
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          image: '/images/largehouse2.jpg',
          description: "A Spacious large sized house for you to have a big gathering in.",
          city: "Alameda",
          state: "California",
          price: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          image: '/images/smallhouse3.jpg',
          description: "A Beautiful small sized house to spend some quiet nights in.",
          city: "Berkeley",
          state: "California",
          price: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          image: '/images/mediumhouse3.jpg',
          description: "A beautiful medium sized house for you and your family.",
          city: "Berkeley",
          state: "California",
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          image: '/images/largehouse3.jpg',
          description: "A Spacious large sized house for you to have a big gathering in.",
          city: "Berkeley",
          state: "California",
          price: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
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
      return queryInterface.bulkDelete('Spots', null, {});
  },
};
