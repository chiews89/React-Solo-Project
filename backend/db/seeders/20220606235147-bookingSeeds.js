"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 2,
          checkIn: "2022-11-11",
          checkOut: "2022-11-15",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          userId: 3,
          checkIn: "2022-12-11",
          checkOut: "2022-12-18",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          userId: 1,
          checkIn: "2022-10-10",
          checkOut: "2022-10-21",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 4,
          userId: 1,
          checkIn: "2022-02-10",
          checkOut: "2022-02-21",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, null, {});
  },
};
