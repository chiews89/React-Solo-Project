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
          description:
            "A Beautiful small sized house to spend some quiet nights in.",
          city: "Oakland",
          state: "California",
          price: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          description:
            "A beautiful medium sized house for you and your family.",
          city: "Oakland",
          state: "California",
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          description:
            "A Spacious large sized house for you to have a big gathering in.",
          city: "Oakland",
          state: "California",
          price: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          description:
            "A Beautiful small sized house to spend some quiet nights in.",
          city: "Alameda",
          state: "California",
          price: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          description:
            "A beautiful medium sized house for you and your family.",
          city: "Alameda",
          state: "California",
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          description:
            "A Spacious large sized house for you to have a big gathering in.",
          city: "Alameda",
          state: "California",
          price: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          description:
            "A Beautiful small sized house to spend some quiet nights in.",
          city: "Berkeley",
          state: "California",
          price: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          description:
            "A beautiful medium sized house for you and your family.",
          city: "Berkeley",
          state: "California",
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          description:
            "A Spacious large sized house for you to have a big gathering in.",
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
    return queryInterface.bulkDelete("Spots", null, {});
  },
};
