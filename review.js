const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const csrf = require("csurf");
const { User, Spot, Review } = require("./backend/db/models");
const csrfProtection = csrf({ cookie: true });

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
      where: {
        userId: req.params.userId,
      },
      include: [{ model: User }],
    });
    res.json(reviews);
  })
);

// router.put(
//   "/:id",
//   csrfProtection,
//   asyncHandler(async (req, res) => {
//     const reviewId = Number(req.params.id);
//     const review = await Review.findByPk(reviewId, {
//       include: Spot,
//       include: User,
//     });
//     const updatedReview = await review.update(req.body);

//     return res.json(updatedReview);
//   })
// );

module.exports = router;
