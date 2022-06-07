const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const csrf = require("csurf");
const { User, Spot, Booking } = require("../../db/models");
const csrfProtection = csrf({ cookie: true });

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll();
    return res.json(bookings);
  })
);
module.exports = router;
