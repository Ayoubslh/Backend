const mongoose = require('mongoose');


const InsuranceCompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, default: 'insurer' },
    website: { type: String },
    registrationNumber: { type: String, unique: true },
    plans: {
        type: mongoose.Schema.ObjectId,
        ref: 'Plan'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },


});

InsuranceCompanySchema.pre(/^find/, function (next) {
    this.populate({ path: 'plans', select: '-__v -' });
    next();
})
// Hash password before saving
InsuranceCompanySchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.comfirmPassword = undefined; // Remove the confirmation field
    next();
});

// Method to compare passwords
InsuranceCompanySchema.methods.correctPassword = async function (candidatePassword, currentPassword) {
    return await bcrypt.compare(candidatePassword, currentPassword);
};
InsuranceCompanySchema.methods.changedPasswordAfter = function (JWTTimestamps) {
    if (this.ChangesAt) {
        const changedTimestamps = parseInt(this.ChangesAt.getTime() / 1000, 10);
        console.log(JWTTimestamps, changedTimestamps);
        return JWTTimestamps < changedTimestamps;
    }
    // false means that the pass does not changed
    return false;
}

InsuranceCompanySchema.methods.createResetPassToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log(resetToken, this.passwordResetToken);
    this.passwordResetExpires = new Date() + 10 * 60 * 1000;
    return resetToken
}
const InsuranceCompany = mongoose.model('InsuranceCompany', InsuranceCompanySchema);

module.exports = InsuranceCompany;
