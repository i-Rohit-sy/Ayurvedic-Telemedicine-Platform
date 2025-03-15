const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  createConsultation,
  getConsultations,
  getConsultation,
  updateConsultation,
  deleteConsultation,
} = require("../controllers/consultationController");
const { protect } = require("../middleware/auth");

router.use(protect);

// Create consultation
router.post(
  "/",
  [
    check("practitionerId", "Practitioner ID is required").not().isEmpty(),
    check("scheduledTime", "Scheduled time is required").not().isEmpty(),
    check("type", "Consultation type is required").isIn([
      "initial",
      "follow-up",
      "emergency",
    ]),
    check("symptoms", "Symptoms are required").isArray().not().isEmpty(),
    check("amount", "Amount is required").isNumeric(),
  ],
  createConsultation
);

// Get all consultations
router.get("/", getConsultations);

// Get single consultation
router.get("/:id", getConsultation);

// Update consultation
router.put(
  "/:id",
  [
    check("status", "Status is required when updating")
      .optional()
      .isIn(["scheduled", "in-progress", "completed", "cancelled"]),
  ],
  updateConsultation
);

// Delete consultation
router.delete("/:id", deleteConsultation);

module.exports = router;
