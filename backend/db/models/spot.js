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
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      zipcode: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      guests: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      bedrooms: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      bathrooms: {
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
      foreignKey: "spotId"
    })
  };
  return Spot;
};
