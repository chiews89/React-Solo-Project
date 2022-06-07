"use strict";
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define(
    "Spot",
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "userId" },
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      guests: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  Spot.associate = function (models) {
    Spot.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Spot.hasMany(models.Image, {
      onDelete: "cascade",
      hooks: true,
      foreignKey: "spotId",
    });
    Spot.hasMany(models.Review, {
      onDelete: "cascade",
      hooks: true,
      foreignKey: "spotId"
    })
    Spot.hasMany(models.Booking, {
      onDelete: "cascade",
      hooks: true,
      foreignKey: "spotId"
    })
  };
  return Spot;
};
