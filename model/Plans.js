const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverage: [
        {
            type: {
                type: String,
                required: true,
                enum: [
                    "Civil",
                    "Broken glass",
                    "Natural disaster",
                    "Fire",
                    "Theft",
                    "Collision : All Risks",
                    "Collision :Limited refund"
                ]
            },
            price: { type: Number, required: true }
        }
    ],
    price: { type: Number, required: true }, // Base price
    deductible: { type: Number, required: true },
    terms: { type: String, required: true },
    activatedAt: {
        type: Date,
        default: Date.now() * 1000,
    },
    expiresAt: {
        type: Date,
        default: Date.now() + 6 * 30 * 24 * 3600 * 1000,
    },
    isActive: { type: Boolean, default: false }
});

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;
