const { validationResult } = require("express-validator");
const Prescription = require("../models/Prescription");
const Consultation = require("../models/Consultation");

// @desc    Create prescription
// @route   POST /api/prescriptions
// @access  Private/Practitioner
exports.createPrescription = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { consultation, medicines, instructions } = req.body;

    // Check if consultation exists
    const consultationExists = await Consultation.findById(consultation);
    if (!consultationExists) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    // Check if practitioner is assigned to the consultation
    if (consultationExists.practitioner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to create prescription for this consultation",
      });
    }

    const prescription = await Prescription.create({
      consultation,
      practitioner: req.user.id,
      patient: consultationExists.patient,
      medicines,
      instructions,
    });

    res.status(201).json({
      success: true,
      data: prescription,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get all prescriptions
// @route   GET /api/prescriptions
// @access  Private
exports.getPrescriptions = async (req, res) => {
  try {
    let query;

    if (req.user.role === "practitioner") {
      query = { practitioner: req.user.id };
    } else if (req.user.role === "user") {
      query = { patient: req.user.id };
    } else {
      query = {};
    }

    const prescriptions = await Prescription.find(query)
      .populate("consultation", "date status")
      .populate("practitioner", "name")
      .populate("patient", "name");

    res.json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get single prescription
// @route   GET /api/prescriptions/:id
// @access  Private
exports.getPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("consultation", "date status")
      .populate("practitioner", "name")
      .populate("patient", "name");

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    // Check if user is authorized to view the prescription
    if (
      req.user.role !== "admin" &&
      prescription.practitioner._id.toString() !== req.user.id &&
      prescription.patient._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this prescription",
      });
    }

    res.json({
      success: true,
      data: prescription,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Update prescription
// @route   PUT /api/prescriptions/:id
// @access  Private/Practitioner
exports.updatePrescription = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    // Check if practitioner is authorized to update the prescription
    if (prescription.practitioner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this prescription",
      });
    }

    prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate("consultation", "date status")
      .populate("practitioner", "name")
      .populate("patient", "name");

    res.json({
      success: true,
      data: prescription,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Delete prescription
// @route   DELETE /api/prescriptions/:id
// @access  Private/Practitioner
exports.deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    // Check if practitioner is authorized to delete the prescription
    if (prescription.practitioner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this prescription",
      });
    }

    await prescription.remove();

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
