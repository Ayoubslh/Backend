const Insurer = require('../model/Insurer');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const { promisify } = require('util');

// Generate JWT
const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
});

// Send Token Response
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // Exclude password from response
    user.password = undefined;

    // Send token via secure cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    });

    // JSON response
    res.status(statusCode).json({
        status: 'success',
        token,
        data: user,
    });
};

// Expert Signup
exports.signup = async (req, res, next) => {
    try {
        const newInsurer = await Insurer.create(req.body);
        createSendToken(newInsurer, 201, res);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

// User Login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check email and password
        if (!email || !password) {
            throw new AppError('Please provide email and password', 400);
        }

        // Find user and include password field
        const insurer = await Insurer.findOne({ email }).select('+password');


        // Verify user and password
        if (!expert || !(await expert.correctPassword(password, insurer.password))) {
            throw new AppError('Please provide correct email and password', 400);
        }
        // Send token to user
        createSendToken(insurer, 200, res);
    } catch (err) {
        next(err);
    }
};

// Protect Route
exports.protect = async (req, res, next) => {
    try {
        // Get token from header
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Check token presence
        if (!token) {
            return next(new AppError('You are not logged in! Please log in to get access.', 401));
        }

        // Verify token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
            .catch(err => {
                if (err.name === 'TokenExpiredError') {
                    throw new AppError('Your session has expired. Please log in again.', 401);
                }
                throw new AppError('Invalid token. Please log in again.', 401);
            });

        // Find user by decoded ID
        const freshInsurer = await Insurer.findById(decoded.id);
        if (!freshInsurer) {
            return next(new AppError('The user belonging to this token no longer exists.', 401));
        }

        // Check if user changed password
        if (freshInsurer.changedPasswordAfter(decoded.iat)) {
            return next(new AppError('User recently changed password. Please log in again.', 401));
        }

        // Attach user to request
        req.user = freshInsurer;
        next();
    } catch (error) {
        next(error);
    }
};

// Restrict Access to Roles
exports.restrictTo = (...roles) => (req, res, next) => {
    try {
        if (!roles.includes(req.insurer.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    } catch (error) {
        next(error);
    }
};
