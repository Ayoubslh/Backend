const mongoose = require('mongoose');

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
    claim: {
        type: mongoose.Schema.ObjectId,
        ref: "Claim",
    },
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

const Expert = mongoose.model('Expert', expertSchema);

module.exports = Expert;
