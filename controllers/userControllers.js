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

exports.deleteUser = (req,res)=> {
    res.status(200).json({
        msg: "user deleted",
    })
}