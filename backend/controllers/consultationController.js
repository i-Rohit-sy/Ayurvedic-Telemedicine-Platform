const { validationResult } = require("express-validator");
const Consultation = require("../models/Consultation");
const User = require("../models/User");

// @desc    Create new consultation
// @route   POST /api/consultations
// @access  Private
exports.createConsultation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { practitionerId, scheduledTime, type, symptoms, amount } = req.body;

    // Check if practitioner exists
    const practitioner = await User.findById(practitionerId);
    if (!practitioner || practitioner.role !== "practitioner") {
      return res.status(404).json({
        success: false,
        message: "Practitioner not found",
      });
    }

    // Create consultation
    const consultation = await Consultation.create({
      patient: req.user.id,
      practitioner: practitionerId,
      scheduledTime,
      type,
      symptoms,
      amount,
      meetingLink: `https://meet.ayurveda.com/${Date.now()}`,
    });

    res.status(201).json({
      success: true,
      data: consultation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get all consultations for a user
// @route   GET /api/consultations
// @access  Private
exports.getConsultations = async (req, res) => {
  try {
    let query;

    if (req.user.role === "practitioner") {
      query = { practitioner: req.user.id };
    } else {
      query = { patient: req.user.id };
    }

    const consultations = await Consultation.find(query)
      .populate("patient", "name email")
      .populate("practitioner", "name email specialization")
      .sort("-scheduledTime");

    res.json({
      success: true,
      count: consultations.length,
      data: consultations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get single consultation
// @route   GET /api/consultations/:id
// @access  Private
exports.getConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate("patient", "name email")
      .populate("practitioner", "name email specialization");

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    // Make sure user is consultation owner
    if (
      consultation.patient._id.toString() !== req.user.id &&
      consultation.practitioner._id.toString() !== req.user.id
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this consultation",
      });
    }

    res.json({
      success: true,
      data: consultation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Update consultation
// @route   PUT /api/consultations/:id
// @access  Private
exports.updateConsultation = async (req, res) => {
  try {
    let consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    // Make sure user is consultation owner
    if (
      consultation.patient.toString() !== req.user.id &&
      consultation.practitioner.toString() !== req.user.id
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this consultation",
      });
    }

    consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      data: consultation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Delete consultation
// @route   DELETE /api/consultations/:id
// @access  Private
exports.deleteConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    // Make sure user is consultation owner
    if (
      consultation.patient.toString() !== req.user.id &&
      consultation.practitioner.toString() !== req.user.id
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this consultation",
      });
    }

    await consultation.remove();

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
