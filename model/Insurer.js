const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverage: { type: String, required: true }, // e.g., health, car, life
    premium: { type: Number, required: true }, // monthly premium cost
    deductible: { type: Number, required: true },
    terms: { type: String, required: true }, // terms and conditions
    isActive: { type: Boolean, default: true }
});

const InsuranceCompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed password
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role:{type:String,default:'insurer'},
    website: { type: String },
    registrationNumber: { type: String, unique: true },
    plans: [PlanSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    claim:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Claim',

    },
   
});

const InsuranceCompany = mongoose.model('InsuranceCompany', InsuranceCompanySchema);

module.exports = InsuranceCompany;
