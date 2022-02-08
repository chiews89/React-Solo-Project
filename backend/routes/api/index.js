const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots");

router.use("/session", sessionRouter);
router.use("/spots", spotsRouter);
router.use("/users", usersRouter);

router.get(
  "/set-token-cookie",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: "Demo-lition",
      },
    });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

module.exports = router;
