const User = require('../model/User');
const jwt = require('jsonwebtoken');
const AppError=require('./../utils/appError');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const signToken = (id) => jwt.sign({id} , process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

// function that create and send token
const creatSendToken = (user , statusCode , res) => {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRES_IN * 24*60*60*1000),
      httpOnly: true,
    }
    
    console.log(cookieOptions.expires);
    if(process.env.NODE_ENV === "production") cookieOptions.secure = true;  
    res.cookie('jwt' , token ,cookieOptions );
    //remove the password from the output 
    user.password = undefined;
    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user,
      }
    });
  }

// Signup function
exports.signup = async (req, res) => {
    try {
     
    
      const user = await User.create(req.body);
    
      console.log(user);
      creatSendToken(user,201,res);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

// Login function
exports.login = async (req, res,next) => {
    const { email, password } = req.body;
    console.log(email, password);
    if(!password || !email )return next(new AppError("Provide email amd password",400))
    const user = await User.findOne({email}).select('+password');
    
    
      
      console.log(user);
     
      console.log("c");
      if (!user || !await user.correctPassword(password,user.password)) {return next(new AppError("Invalid email or password",401));}
      creatSendToken(user,200,res);
      console.log(token);
      
}
  