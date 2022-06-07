const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const csrf = require("csurf");
const { User, Spot, Booking } = require("../../db/models");
const { requireAuth, setTokenCookie } = require('../../utils/auth');
const csrfProtection = csrf({ cookie: true });

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll();
    return res.json(bookings);
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
      const { spotId, userId, guests, checkIn, checkOut } = req.body
      const booking = await Booking.create(req.body)
      return res.json(booking)
  })
)

module.exports = router;
