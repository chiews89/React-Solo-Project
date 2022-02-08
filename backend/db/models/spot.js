"use strict";
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define(
    "Spot",
    {
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Spot.associate = function (models) {
    // associations can be defined here
    Spot.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return Spot;
};
