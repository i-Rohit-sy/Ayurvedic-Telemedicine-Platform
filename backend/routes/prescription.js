const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

const {
  createPrescription,
  getPrescription,
  getPrescriptions,
  updatePrescription,
  deletePrescription,
} = require("../controllers/prescriptionController");

// @route   POST /api/prescriptions
router.post(
  "/",
  [
    check("consultation", "Consultation ID is required").not().isEmpty(),
    check("medicines", "Medicines are required").isArray({ min: 1 }),
    check("medicines.*.name", "Medicine name is required").not().isEmpty(),
    check("medicines.*.dosage", "Medicine dosage is required").not().isEmpty(),
    check("medicines.*.duration", "Medicine duration is required")
      .not()
      .isEmpty(),
    check("instructions", "Instructions are required").not().isEmpty(),
  ],
  protect,
  authorize("practitioner"),
  createPrescription
);

// @route   GET /api/prescriptions
router.get("/", protect, getPrescriptions);

// @route   GET /api/prescriptions/:id
router.get("/:id", protect, getPrescription);

// @route   PUT /api/prescriptions/:id
router.put(
  "/:id",
  [
    check("medicines", "Medicines are required").optional().isArray({ min: 1 }),
    check("medicines.*.name", "Medicine name is required")
      .optional()
      .not()
      .isEmpty(),
    check("medicines.*.dosage", "Medicine dosage is required")
      .optional()
      .not()
      .isEmpty(),
    check("medicines.*.duration", "Medicine duration is required")
      .optional()
      .not()
      .isEmpty(),
    check("instructions", "Instructions are required")
      .optional()
      .not()
      .isEmpty(),
  ],
  protect,
  authorize("practitioner"),
  updatePrescription
);

// @route   DELETE /api/prescriptions/:id
router.delete("/:id", protect, authorize("practitioner"), deletePrescription);

module.exports = router;
