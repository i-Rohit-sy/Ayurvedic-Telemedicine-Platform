const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  register,
  login,
  getMe,
  logout,
  updatePassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

// Register user
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
    check("role", "Role is required").not().isEmpty(),
    check("phoneNumber", "Please include a valid phone number")
      .not()
      .isEmpty()
      .matches(/^[0-9]{10}$/),
    check("address", "Address is required").not().isEmpty(),
  ],
  register
);

// Login user
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

// Get current user
router.get("/me", protect, getMe);

// Logout user
router.post("/logout", protect, logout);

// Update password
router.put(
  "/updatepassword",
  [
    check("currentPassword", "Current password is required").exists(),
    check(
      "newPassword",
      "Please enter a password with 8 or more characters"
    ).isLength({
      min: 8,
    }),
  ],
  protect,
  updatePassword
);

module.exports = router;
