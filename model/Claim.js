const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    licenseIssuedDate: { type: Date, required: true }
});

const VehicleSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    chassisNumber: { type: String, required: true },
    insuranceCompany: { type: String, required: true },
    insurancePolicyNumber: { type: String, required: true }
});

const WeatherConditionsSchema = new mongoose.Schema({
    weather: { type: String, required: true },
    visibility: { type: String, required: true }
});

const DamageDescriptionSchema = new mongoose.Schema({
    vehicleRegistrationNumber: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

const WitnessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    statement: { type: String, required: true }
});



const ClaimSchema = new mongoose.Schema({
    accidentDate: { type: Date, required: true },
    accidentTime: { type: String, required: true },
    accidentLocation: { type: String, required: true },
    drivers: [DriverSchema],
    vehicles: [VehicleSchema],
    weatherConditions: WeatherConditionsSchema,
    damages: [DamageDescriptionSchema],
    witnesses: [WitnessSchema],
    observations: { type: String },
    disagreements: { type: String },
    signatures: {
        driver1: { type: String, required: true },
        driver2: { type: String, required: true }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    proforma: {
        type: String
    },

    expertrapport: {
        type: String

    },
    expertrapport: {
        type: String
    },
    Insurance: {
        type: mongoose.Schema.ObjectId,
        ref: "InsuranceCompany",
    },
    accepted: Boolean,
    rejectionreason: String,
    active: Boolean,
});

ClaimSchema.pre(/^find/, function (next) {
    this.populate({ path: 'User', select: '-__v +personalinfo.fullname +personalinfo.phone +personalinfo.address' })
    next();
})


const Claim = mongoose.model('Claim', ClaimSchema);


module.exports = Claim;
