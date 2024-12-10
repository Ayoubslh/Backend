const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverage: { type: String, required: true },
    premium: { type: Number, required: true }, 
    deductible: { type: Number, required: true },
    terms: { type: String, required: true }, 
    isActive: { type: Boolean, default: true }
});

const Plan = mongoose.model('Plan', ClaimSchema);

module.exports = Plan;