const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Spot } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({ include: ['Images']});
    return res.json(spots);
  })
);

module.exports = router;
