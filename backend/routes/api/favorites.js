const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const csrf = require("csurf");
const { User, Spot, Image, Review, Favorite } = require("../../db/models");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const favorites = await Favorite.findAll({ include: [{model: Spot, include: Image}] });
    return res.json(favorites);
  })
);

module.exports = router;
