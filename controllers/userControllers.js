const User = require('../model/User');
const jwt = require("jsonwebtoken");
const AppError = require('../utils/appError');
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
        return next(new AppErrorError("user not found",404));

    }
    res.status(200).json({
        status: "successe",
        user,
    })
}

exports.updateMe =  async (req, res , next)=>{
    //1 create error if user POSTs password data
    if(req.body.password || req.body.passwordComfirm)
      return next(new AppError('this rout is not for password updates. Please use /updatePassword.' , 400))
    // 2 filter out the req.body from the unwanted fields
      const filteredBody = filterOBj(req.body , 'name' , 'email');
    // 3 update user document
    const user = await User.findByIdAndUpdate(req.user.id , filteredBody , {
      new: true,
      runValidators : true,
    })
  
    res.status(200).json({
      status: 'success',
      data : {
        user ,
      },
    })
}

exports.deleteUser = async(req,res)=> {
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