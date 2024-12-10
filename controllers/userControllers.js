const User = require('../model/User');
const jwt = require("jsonwebtoken");
// only for admin
exports.getAllUsers = async(req,res)=> {
    const users = await User.find();
    res.status(200).json({
        status: "successe",
        data: {
            users,
        }
    })
}

exports.getUserById = async (req,res)=> {
    const user = await User.findById(req.params.id);
    if(!user) {
        throw new Error("user not found");
        return;
    }
    res.status(200).json({
        status: "successe",
        user,
    })
}
//sign in
exports.createUser = async(req,res)=> {
        // Extract the required fields from the request body
        // Check if the user already exists
        const existingUser = await User.findOne({ "personalInfo.email": email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Create a new user
        const newUser = new User({
            personalInfo: { fullName, email, password },
        });

        await newUser.save();

        // Generate a JWT token
        const token = Subscriber.generateToken(newUser._id);
        
        res.status(201).json({
            status: "success",
            newUser,
        });

}

exports.updateUser = (req,res)=> {
    res.status(200).json({
        msg: "user updated",
    })
}

exports.deleteUser = (req,res)=> {
    res.status(200).json({
        msg: "user deleted",
    })
}