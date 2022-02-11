"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
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
      rating: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      review: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {}
  );
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: "userId" });
    Review.belongsTo(models.Spot, { foreignKey: "spotId" });
  };
  return Review;
};
