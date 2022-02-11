'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Users" },
    },
    spotId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: 'Spots'}
    },
    rating: DataTypes.INTEGER,
    review: DataTypes.TEXT
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: 'userId' })
    Review.belongsTo(models.Spot, { foreignKey: 'spotId' })
  };
  return Review;
};
