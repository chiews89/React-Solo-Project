"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    "Favorite",
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "userId" },
      },
      spotId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "spotId" },
      },
    },
    {}
  );
  Favorite.associate = function (models) {
    // associations can be defined here
    Favorite.belongsTo(models.User, { foreignKey: "userId" });
    Favorite.belongsTo(models.Spot, { foreignKey: "spotId" });
  };
  return Favorite;
};
