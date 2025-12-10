const express = require("express");
const router = express.Router();
const {
  protect,
  login,
  signup,
  updatePassword,
  forgetPassword,
  resetPassword,
  verifyEmail,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/signup", signup);
router.patch("/updatePassword", protect, updatePassword);
router.post("/forgetPassword", forgetPassword);
router.patch("/resetPassword/:token", resetPassword);
router.post("/verifyEmail", verifyEmail);

module.exports = router;
