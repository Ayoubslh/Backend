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
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Create a new user with only the required fields
        const newUser = await User.create(req.body);

        // Save the user while skipping validation for other fields
        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: newUser,
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