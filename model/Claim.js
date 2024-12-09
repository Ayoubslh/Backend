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
    description: { type: String, required: true }
});

const WitnessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    statement: { type: String, required: true }
});

const SketchSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true }, 
    description: { type: String } 
});

const ClaimSchema = new mongoose.Schema({
    accidentDate: { type: Date, required: true },
    accidentTime: { type: String, required: true }, 
    accidentLocation: { type: String, required: true },
    drivers: [DriverSchema],
    vehicles: [VehicleSchema],
    weatherConditions: WeatherConditionsSchema,
    damages: [DamageDescriptionSchema],
    sketch: SketchSchema,
    witnesses: [WitnessSchema],
    observations: { type: String }, 
    disagreements: { type: String }, 
    signatures: {
        driver1: { type: String, required: true }, 
        driver2: { type: String, required: true }  
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Claim = mongoose.model('Claim', ClaimSchema);

module.exports = Claim;
