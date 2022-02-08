"use strict";
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define(
    "Spot",
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {model: 'Users'}
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL
      },
    },
    {}
  );
  Spot.associate = function (models) {
    Spot.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Spot.hasMany(models.Image, { foreignKey: "spotId" });
  };
  return Spot;
};
