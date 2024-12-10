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

exports.updateUser = async(req,res)=> {
    const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    
      if(!doc){
        return next(new Error('No Tour found'));
      }
    
      res.status(200).json({
        status: 'success',
        data: {
          doc,
        },
      });
}

exports.deleteUser = (req,res)=> {
    res.status(200).json({
        msg: "user deleted",
    })
}