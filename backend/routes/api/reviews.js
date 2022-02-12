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
    const { userId, spotId, rating, review } = req.body;
    const reviews = await Review.create({ userId, spotId, rating, review });
    return res.json(reviews);
  })
);

router.delete(
  "/spots/:id/",
  asyncHandler(async (req, res) => {
    const reviewId = Number(req.params.id);
    Review.destroy({
      where: {
        id: reviewId
      },
    });
    return res.json(reviewId);
  })
);


module.exports = router;
