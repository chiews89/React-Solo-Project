const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const csrf = require("csurf");
const { Spot, Image } = require("../../db/models");
const csrfProtection = csrf({ cookie: true });

const spotValidators = [
  check("Images").notEmpty().isURL(),
  check("userId").notEmpty().isInt(),
  check("description").notEmpty().withMessage("Please provide a description"),
  check("city")
    .notEmpty()
    .withMessage("Please provide a city")
    .isLength({ max: 25 })
    .withMessage("City cannot be longer than 25 characters"),
  check("state")
    .notEmpty()
    .withMessage("Please provide a state")
    .isLength({ max: 25 })
    .withMessage("State cannot be longer than 25 characters"),
  check("price")
    .notEmpty()
    .withMessage("Please provide a price")
    .isDecimal({ min: 1.0 })
    .withMessage("Price cannot be less than $1.00"),
];

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
  spotValidators,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const spot = await Spot.create(req.body);
    const image = await Image.create({
      url: req.body.image.url,
      spotId: spot.id,
    });
    spot.dataValues.Images = [image];
    return res.json(spot);
  })
);

router.put(
  "/:id",
  csrfProtection,
  spotValidators,
  asyncHandler(async (req, res) => {
    const spotId = Number(req.params.id);
    const imageUrl = req.body.image.url
    const image = await Image.findByPk(req.params.id);
    const spot = await Spot.findByPk(spotId);
    const newUrlImage = {
      id: image.id,
      spotId: spot.id,
      url: req.body.image.url
    };
    const currentImage = await image.update(newUrlImage);
    const updatedSpot = await spot.update(req.body);
    updatedSpot.dataValues.Images = [currentImage];

    return res.json(updatedSpot);
  })
);

router.delete('/:id', csrfProtection, asyncHandler(async(req, res) => {
  const spotId = Number(req.params.id)
  Spot.destroy({where: { id: spotId}})
  return res.json(spotId)
}))

module.exports = router;
