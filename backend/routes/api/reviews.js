const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const csrf = require("csurf");
const { User, Spot, Image, Review } = require("../../db/models");
const csrfProtection = csrf({ cookie: true });

router.get(
  "/spots/:id/",
  asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
      where: {
        spotId: req.params.id,
      },
    });
    return res.json(reviews);
  })
);

router.post(
  "/spots/:id/",
  asyncHandler(async (req, res) => {
    const review = await Review.create(req.body, {
      where: {
        spotId: req.params.id,
      },
    });
    return res.json(review);
  })
);
module.exports = router;
