const { validationResult } = require("express-validator");
const User = require("../models/User");

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get all practitioners
// @route   GET /api/users/practitioners
// @access  Private
exports.getPractitioners = async (req, res) => {
  try {
    const practitioners = await User.find({
      role: "practitioner",
      active: true,
    }).select("-password");
    res.json({
      success: true,
      count: practitioners.length,
      data: practitioners,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
exports.updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update fields
    const fieldsToUpdate = {
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      phoneNumber: req.body.phoneNumber || user.phoneNumber,
      address: req.body.address || user.address,
    };

    if (req.body.specialization && user.role === "practitioner") {
      fieldsToUpdate.specialization = req.body.specialization;
    }

    if (req.body.experience && user.role === "practitioner") {
      fieldsToUpdate.experience = req.body.experience;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: fieldsToUpdate },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Instead of deleting, set active to false
    user.active = false;
    await user.save();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
