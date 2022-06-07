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
          address: "396 Locust View Drive",
          city: "Oakland",
          state: "California",
          price: 100,
          guests: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          description:
            "A beautiful medium sized house for you and your family.",
          address: "1866 Station Street",
          city: "Oakland",
          state: "California",
          price: 200,
          guests: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          description:
            "A Spacious large sized house for you to have a big gathering in.",
          address: "4511 Station Street",
          city: "Oakland",
          state: "California",
          price: 300,
          guests: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          description:
            "A Beautiful small sized house to spend some quiet nights in.",
          address: "155 Green Avenue",
          city: "Alameda",
          state: "California",
          price: 100,
          guests: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          description:
            "A beautiful medium sized house for you and your family.",
          address: "1528 Lindale Avenue",
          city: "Alameda",
          state: "California",
          price: 200,
          guests: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          description:
            "A Spacious large sized house for you to have a big gathering in.",
          address: "706 Lindale Avenue",
          city: "Alameda",
          state: "California",
          price: 300,
          guests: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          description:
            "A Beautiful small sized house to spend some quiet nights in.",
          address: "610 Lindale Avenue",
          city: "Berkeley",
          state: "California",
          price: 100,
          guests: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          description:
            "A beautiful medium sized house for you and your family.",
          address: "2919 Clifford Street",
          city: "Berkeley",
          state: "California",
          price: 200,
          guests: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          description:
            "A Spacious large sized house for you to have a big gathering in.",
          address: "3860 Lindale Avenue",
          city: "Berkeley",
          state: "California",
          price: 300,
          guests: 7,
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
