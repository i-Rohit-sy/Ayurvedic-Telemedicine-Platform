const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["patient", "practitioner", "admin"],
      default: "patient",
    },
    profilePicture: {
      type: String,
    },
    specialization: {
      type: String,
      required: function () {
        return this.role === "practitioner";
      },
    },
    experience: {
      type: Number,
      required: function () {
        return this.role === "practitioner";
      },
    },
    medicalHistory: [
      {
        condition: String,
        diagnosis: String,
        treatment: String,
        date: Date,
      },
    ],
    consultations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Consultation",
      },
    ],
    prescriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prescription",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
