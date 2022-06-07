"use strict";
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      spotId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "spotId" },
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "userId" },
      },
      checkIn: { allowNull: false, type: DataTypes.DATE },
      checkOut: { allowNull: false, type: DataTypes.DATE },
    },
    {}
  );
  Booking.associate = function (models) {
    // associations can be defined here
    Booking.belongsTo(models.User, { foreignKey: "userId" });
    Booking.belongsTo(models.Spot, { foreignKey: "spotId" });
  };
  return Booking;
};
