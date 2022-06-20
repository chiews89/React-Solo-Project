const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const csrf = require("csurf");
const { User, Spot, Booking, Image } = require("../../db/models");
const { requireAuth, setTokenCookie } = require("../../utils/auth");
const csrfProtection = csrf({ cookie: true });

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll({ include: [{model: Spot, include: Image}] });
    return res.json(bookings);
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { spotId, userId, guests, checkIn, checkOut } = req.body;
    const booking = await Booking.create(req.body);
    return res.json(booking);
  })
);

router.delete(
  "/:bookingId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id, Bookings } = req.body;
    const bookingId = parseInt(req.params.bookingId, 10);
    const currentBooking = await Booking.findByPk(bookingId);

    if (currentBooking) {
      await currentBooking.destroy();
      return res.json({ message: "Successfuly deleted" });
    }
  })
);
module.exports = router;
