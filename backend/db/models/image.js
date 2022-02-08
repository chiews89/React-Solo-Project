"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      rideId: DataTypes.INTEGER,
      url: DataTypes.TEXT,
    },
    {}
  );
  Image.associate = function (models) {
    // associations can be defined here
    Image.belongsTo(models.Spot, {
      foreignKey: "spotId",
    });
  };
  return Image;
};