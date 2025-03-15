const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

// Import user controller (we'll create this next)
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getPractitioners,
} = require("../controllers/userController");

// Get all users (admin only)
router.get("/", protect, authorize("admin"), getUsers);

// Get all practitioners
router.get("/practitioners", protect, getPractitioners);

// Get current user profile
router.get("/me", protect, getUser);

// Update user profile
router.put(
  "/me",
  [
    check("name", "Name is required").optional().not().isEmpty(),
    check("email", "Please include a valid email").optional().isEmail(),
    check("phoneNumber", "Please include a valid phone number")
      .optional()
      .not()
      .isEmpty(),
  ],
  protect,
  updateUser
);

// Delete user (admin only)
router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
