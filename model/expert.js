const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const expertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Expert must have a name'],
    },
    email: {
        type: String,
        required: [true, 'Expert must have an email'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: 'Please provide a valid email address',
        },
    },
    phone: {
        type: String,
        required: [true, 'Expert must have a phone number'],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    comfirmPassword: {
        type: String,
        required: [true, "Password confirmation is required"],
        validate: {
            validator: function (value) {
                // `this.password` is available only on `save()` or `create()`
                console.log();
                return value === this.password;
            },
            message: "Passwords do not match",
        },
    },
    claim: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Claim", // Reference the "Claim" model
        }
    ],
    reports: [
        {
            clientName: {
                type: String,
                required: [true, 'Client name is required'],
            },
            damageDescription: {
                type: String,
                required: [true, 'Damage description is required'],
            },
            estimatedRefund: {
                type: Number,
                required: [true, 'Estimated refund amount is required'],
            },
            reportDate: {
                type: Date,
                default: Date.now,
            },
            pdfFilePath: {
                type: String,
                required: [true, 'Path to the PDF file is required'],
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

expertSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.comfirmPassword = undefined; // Remove the confirmation field
    next();
});

// Method to compare passwords
expertSchema.methods.correctPassword = async function (candidatePassword, currentPassword) {
    return await bcrypt.compare(candidatePassword, currentPassword);
};
expertSchema.methods.changedPasswordAfter = function (JWTTimestamps) {
    if (this.ChangesAt) {
        const changedTimestamps = parseInt(this.ChangesAt.getTime() / 1000, 10);
        console.log(JWTTimestamps, changedTimestamps);
        return JWTTimestamps < changedTimestamps;
    }
    // false means that the pass does not changed
    return false;
}

expertSchema.methods.createResetPassToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log(resetToken, this.passwordResetToken);
    this.passwordResetExpires = new Date() + 10 * 60 * 1000;
    return resetToken
}
const Expert = mongoose.model('Expert', expertSchema);

module.exports = Expert;
