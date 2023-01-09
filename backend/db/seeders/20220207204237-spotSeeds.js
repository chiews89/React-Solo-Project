"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          address: "396 Locust View Drive",
          city: "Oakland",
          state: "California",
          title: "A Beautiful small sized house to spend some quiet nights in",
          description:
            "A Beautiful small sized house to spend some quiet nights in.",
          price: 100,
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          address: "1866 Station Street",
          city: "Oakland",
          state: "California",
          title: "A beautiful medium sized house for you and your family",
          description:
            "A beautiful medium sized house for you and your family.",
          price: 200,
          guests: 3,
          bedrooms: 2,
          bathrooms: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          address: "4511 Station Street",
          city: "Oakland",
          state: "California",
          title:
            "A Spacious large sized house for you to have a big gathering in",
          description:
            "A Spacious large sized house for you to have a big gathering in.",
          price: 300,
          guests: 5,
          bedrooms: 4,
          bathrooms: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          address: "155 Green Avenue",
          city: "Alameda",
          state: "California",
          title: "A Beautiful small sized house to spend some quiet nights in",
          description:
            "A Beautiful small sized house to spend some quiet nights in.",
          price: 100,
          guests: 1,
          bedrooms: 2,
          bathrooms: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          address: "1528 Lindale Avenue",
          city: "Alameda",
          state: "California",
          title: "A beautiful medium sized house for you and your family",
          description:
            "A beautiful medium sized house for you and your family.",
          price: 200,
          guests: 3,
          bedrooms: 3,
          bathrooms: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          address: "706 Lindale Avenue",
          city: "Alameda",
          state: "California",
          title:
            "A Spacious large sized house for you to have a big gathering in",
          description:
            "A Spacious large sized house for you to have a big gathering in.",
          price: 300,
          guests: 6,
          bedrooms: 3,
          bathrooms: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          address: "610 Lindale Avenue",
          city: "Berkeley",
          state: "California",
          title: "A Beautiful small sized house to spend some quiet nights in",
          description:
            "A Beautiful small sized house to spend some quiet nights in.",
          price: 100,
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          address: "2919 Clifford Street",
          city: "Berkeley",
          state: "California",
          title: "A beautiful medium sized house for you and your family",
          description:
            "A beautiful medium sized house for you and your family.",
          price: 200,
          guests: 4,
          bedrooms: 2,
          bathrooms: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          address: "3860 Lindale Avenue",
          city: "Berkeley",
          state: "California",
          title:
            "A Spacious large sized house for you to have a big gathering in",
          description:
            "A Spacious large sized house for you to have a big gathering in.",
          price: 300,
          guests: 7,
          bedrooms: 4,
          bathrooms: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  },
};
