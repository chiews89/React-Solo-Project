'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Bookings', {
    spotId: DataTypes.INTEGER
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
  };
  return Booking;
};
