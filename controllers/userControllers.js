const User = require('../model/User');

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
    }
    res.status(200).json({
        msg: "user 15",
    })
}

exports.createUser = (req,res)=> {
    res.status(200).json({
        msg: "user created",
    })
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