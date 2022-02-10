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
    console.log(req.body.image)
    const image = await Image.create({
      url: req.body.image.url,
      spotId: spot.id
    })
    spot.image = image
    console.log('88888', spot)
    return res.json(spot);
  })
);


module.exports = router;
