const mongoose = require("mongoose");
const bcrypt = require('bcryptjs'); 


const subscriberSchema = new mongoose.Schema({
    personalInfo: {
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
            unique : true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
            select:false,
        },
        comfirmePassword: {
            type: String,
            required: [true, "password is required"],
            select:false,
        }
    },
    housingInfo: {
        postalAddress: {
            type: String,
            required: [true, "Postal address is required"],
            trim: true,
        },
        type: {
            type: String,
            required: [true, "Housing type is required"],
            enum: ["apartment", "house", "other"], // Limit options
        },
        area: {
            type: Number,
            required: [true, "Housing area is required"],
            min: [1, "Housing area must be at least 1 m²"],
        },
    },
    meterInfo: {
        //PCE : numéro unique présent sur votre facture de gaz 
        //PDL : est un identifiant unique composé de 14 chiffres. Il correspond à l’emplacement de votre installation électrique et est donc rattaché à un logement, et non pas à un client ou à un contrat.
        PDL_PCE: {
            type: String,
            required: [true, "PDL/PCE number is required"],
            match: [/^[a-zA-Z0-9]{10,20}$/, "PDL/PCE must be 10-20 alphanumeric characters"],
        },
        //meterReading : Represents the latest reading from the subscriber's electricity or gas meter, typically measured in kilowatt-hours (kWh) for electricity or cubic meters for gas.
        meterReading: {
            type: Number,
            required: [true, "Meter reading is required"],
            min: [0, "Meter reading cannot be negative"],
        },
    },
    //RIB: The RIB is a unique identifier for a bank account in France (and some other countries like Algeria). It includes information like the bank code, branch code, account number, and a key to verify its validity.
    bankInfo: {
        RIB: {
            type: String,
            required: [true, "RIB is required"],
            match: [/^\d{23}$/, "RIB must be exactly 23 digits"], // Example for RIB format
        },
    },
    contractStartDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value >= new Date(); // Ensure date is not in the past
            },
            message: "Contract start date cannot be in the past",
        },
    },
    claim: {
        type: mongoose.Schema.ObjectId,
        ref : "claim",
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:"plan",
    },
    role: {
        type: String,
        enum: ['user','expert','admin'],
        default:'user',
    }
}, { timestamps: true });


// **Pre-save middleware**: Hash the password before saving
subscriberSchema.pre("save", async function (next) {
    if (!this.isModified("personalInfo.password")) return next(); // Skip if password is not modified
    this.personalInfo.password = await bcrypt.hash(this.personalInfo.password, 10); // Hash password
    next();
});
subscriberSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password= await bcrypt.hashSync(this.password,12);
    this.passwordConfirm=undefined;
    next();

})
subscriberSchema.pre('save',function(next){
  if(!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now()-1000;
  next(); 

})
subscriberSchema.pre(/^find/,function(next){
  this.find({active:{$ne:false}})
  next();
})
subscriberSchema.methods.correctPassword= async function(candidatePassword,userPassword){
  return await bcrypt.compare(candidatePassword,userPassword);
}
subscriberSchema.methods.changePasswordAfter=function(JWTTimestamp){
  if(this.passwordChangedAt){

    const passwordChangedTimestamp=parseInt(this.passwordChangedAt.getTime()/1000,10);
    return JWTTimestamp<passwordChangedTimestamp 

  }
  
  return false;
}

subscriberSchema.methods.creatPasswordResetToken= function(){
  const resetToken= crypto.randomBytes(32).toString('hex');
 this.passwordResetToken= crypto.createHash('sha256').update(resetToken).digest('hex');
 this.passwordResetExpires=Date.now()+10*60*1000;
 return resetToken;

}





module.exports = mongoose.model("User", subscriberSchema);