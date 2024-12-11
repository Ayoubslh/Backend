const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const subscriberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10,15}$/, "Phone number must be 10-15 digits"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    comfirmePassword: {
      type: String,
      required: [true, "Password confirmation is required"],
      validate: {
        validator: function (value) {
          // `this.password` is available only on `save()` or `create()`
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
    postalAddress: {
      type: String,
      required: [true, "Postal address is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Housing type is required"],
      enum: ["apartment", "house", "other"],
    },
    area: {
      type: Number,
      required: [true, "Housing area is required"],
      min: [1, "Housing area must be at least 1 m²"],
    },
    PDL_PCE: {
      type: String,
      required: [true, "PDL/PCE number is required"],
      match: [/^[a-zA-Z0-9]{10,20}$/, "PDL/PCE must be 10-20 alphanumeric characters"],
    },
    meterReading: {
      type: Number,
      required: [true, "Meter reading is required"],
      min: [0, "Meter reading cannot be negative"],
      maxlenght:6
    },
    RIB: {
      type: String,
      required: [true, "RIB is required"],
      match: [/^\d{23}$/, "RIB must be exactly 23 digits"],
    },
    contractStartDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value >= new Date().setHours(0, 0, 0, 0); // Ensure date is not in the past
        },
        message: "Contract start date cannot be in the past",
      },
    },
    claim: {
      type: mongoose.Schema.ObjectId,
      ref: "Claim",
    },
    plan: {
      type: mongoose.Schema.ObjectId,
      ref: "Plan",
    },
    role: {
      type: String,
      enum: ["user", "expert", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Hash password before saving
subscriberSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.comfirmePassword = undefined; // Remove the confirmation field
  next();
});

// Method to compare passwords
subscriberSchema.methods.correctPassword = async function (candidatePassword, currentPassword) {
  return await bcrypt.compare(candidatePassword, currentPassword);
};
subscriberSchema.methods.changedPasswordAfter = function (JWTTimestamps) {
  if (this.ChangesAt) {
    const changedTimestamps = parseInt(this.ChangesAt.getTime() / 1000, 10);
    console.log(JWTTimestamps, changedTimestamps);
    return JWTTimestamps < changedTimestamps;
  }
  // false means that the pass does not changed
  return false;
}

subscriberSchema.methods.createResetPassToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  console.log(resetToken, this.passwordResetToken);
  this.passwordResetExpires = new Date() + 10 * 60 * 1000;
  return resetToken
}
module.exports = mongoose.model("User", subscriberSchema);
