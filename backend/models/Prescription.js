const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    consultation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    practitioner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    herbs: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
          enum: ["grams", "ml", "tablets", "capsules"],
        },
        instructions: String,
        timing: {
          frequency: {
            type: String,
            enum: ["once", "twice", "thrice", "four-times", "as-needed"],
            required: true,
          },
          whenToTake: {
            type: String,
            enum: ["before-meal", "after-meal", "with-meal", "empty-stomach"],
            required: true,
          },
        },
      },
    ],
    dietaryRecommendations: [
      {
        type: {
          type: String,
          enum: ["do-eat", "dont-eat", "lifestyle"],
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        duration: String,
      },
    ],
    lifestyle: [
      {
        category: {
          type: String,
          enum: ["exercise", "meditation", "yoga", "sleep", "other"],
          required: true,
        },
        recommendation: {
          type: String,
          required: true,
        },
        duration: String,
        frequency: String,
      },
    ],
    duration: {
      type: Number, // in days
      required: true,
    },
    specialInstructions: String,
    status: {
      type: String,
      enum: ["active", "completed", "discontinued"],
      default: "active",
    },
    validUntil: {
      type: Date,
      required: true,
    },
    refills: {
      type: Number,
      default: 0,
    },
    refillsUsed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for common queries
prescriptionSchema.index({ patient: 1, createdAt: -1 });
prescriptionSchema.index({ practitioner: 1, createdAt: -1 });
prescriptionSchema.index({ consultation: 1 });
prescriptionSchema.index({ status: 1 });

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
