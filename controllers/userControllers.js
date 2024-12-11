const User = require('../model/User');
const jwt = require("jsonwebtoken");
const AppError = require('../utils/appError');
const Plan = require('../model/Plans');
// only for admin
exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        status: "successe",
        data: {
            users,
        }
    })
}

<
exports.getUserById = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
        return next(new AppErrorError("user not found", 404));


    }
    res.status(200).json({
        status: "successe",
        user,
    })
}

exports.updateMe = async (req, res, next) => {
    console.log("ok");
    //1 create error if user POSTs password data
    if (req.body.password || req.body.passwordComfirm)
        return next(new AppError('this rout is not for password updates. Please use /updatePassword.', 400))
    console.log("ok1");
    // 3 update user document
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: false,
    })
    console.log(user);
    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    })
}

exports.deleteUser = async (req, res) => {
    const result = await User.deleteOne({ _id: req.params.id }); // Pass an object with `_id`

    // Check if a user was actually deleted
    if (result.deletedCount === 0) {
        return res.status(404).json({
            status: "fail",
            message: "User not found",
        });
    }

    res.status(200).json({
        status: "success",
        message: "User deleted",
    });
}

exports.buyPlan = async (req, res, next) => {
    const { insurerId, planId } = req.params;
    const plan = await Plan.findById(planId);
    console.log(req.user._id);
    const user = await user.findByIdAndUpdate(req.user._id)
}