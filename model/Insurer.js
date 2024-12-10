const mongoose = require('mongoose');


const InsuranceCompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role:{type:String,default:'insurer'},
    website: { type: String },
    registrationNumber: { type: String, unique: true },
    plans: {
        type:mongoose.Schema.ObjectId,
        ref:'Plan'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    claim:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Claim',

    },
   
});

const InsuranceCompany = mongoose.model('InsuranceCompany', InsuranceCompanySchema);

module.exports = InsuranceCompany;
