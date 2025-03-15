const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
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
    scheduledTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // in minutes
      required: true,
      default: 30,
    },
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled"],
      default: "scheduled",
    },
    type: {
      type: String,
      enum: ["initial", "follow-up", "emergency"],
      required: true,
    },
    symptoms: [
      {
        type: String,
        required: true,
      },
    ],
    diagnosis: {
      type: String,
      required: function () {
        return this.status === "completed";
      },
    },
    notes: {
      type: String,
      required: function () {
        return this.status === "completed";
      },
    },
    vitals: {
      bloodPressure: String,
      heartRate: Number,
      temperature: Number,
      respiratoryRate: Number,
      weight: Number,
    },
    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
    },
    followUpDate: Date,
    meetingLink: String,
    recordingUrl: String,
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "refunded"],
      default: "pending",
    },
    amount: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    feedback: String,
  },
  {
    timestamps: true,
  }
);

// Add indexes for common queries
consultationSchema.index({ patient: 1, scheduledTime: -1 });
consultationSchema.index({ practitioner: 1, scheduledTime: -1 });
consultationSchema.index({ status: 1 });

const Consultation = mongoose.model("Consultation", consultationSchema);

module.exports = Consultation;
