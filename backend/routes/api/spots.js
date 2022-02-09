const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Spot, Image } = require("../../db/models");


router.get(
  "/",
  asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({ include: Image });
    return res.json(spots);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const spot = await Spot.findByPk(req.params.id, { include: Image });
    return res.json(spot);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const spot = await Spot.create(req.body)
    return res.json(spot);
  })
);


module.exports = router;
