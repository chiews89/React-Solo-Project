const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const csrf = require("csurf");
const { User, Spot, Image, Review, Favorite } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const favorites = await Favorite.findAll({
      include: [{ model: Spot, include: Image }]
    });
    return res.json(favorites);
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, spotId } = req.body;
    const favorite = await Favorite.create(req.body);
    const spot = await Spot.findByPk(spotId, {include: Image})
    favorite.dataValues.Spot = spot
    return res.json(favorite);
  })
);

router.delete(
  "/:favoriteId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const favoriteId = Number(req.params.favoriteId);
    Favorite.destroy({
      where: {
        id: favoriteId,
      },
    });
    return res.json(favoriteId);
  })
);

module.exports = router;
