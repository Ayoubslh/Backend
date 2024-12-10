const User = require('../model/User');
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
        data: { user },
    });
};

// User Signup
exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        createSendToken(newUser, 201, res);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

// User Login
exports.login = async (req, res, next) => {
    console.log(req.params);
    try {
        const { email, password } = req.body;

        // Check email and password
        if (!email || !password) {
            throw new AppError('Please provide email and password', 400);
        }

        // Find user and include password field
        const user = await User.findOne({ email }).select('+password');
        console.log(user);


        // Verify user and password
        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new AppError('Please provide email and password', 400);
        }

        // Send token to user
        createSendToken(user, 200, res);
    } catch (err) {
        next(new AppError('Login failed', 500));
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
        const freshUser = await User.findById(decoded.id);
        if (!freshUser) {
            return next(new AppError('The user belonging to this token no longer exists.', 401));
        }

        // Check if user changed password
        if (freshUser.changedPasswordAfter(decoded.iat)) {
            return next(new AppError('User recently changed password. Please log in again.', 401));
        }

        // Attach user to request
        req.user = freshUser;
        next();
    } catch (error) {
        next(error);
    }
};

// Restrict Access to Roles
exports.restrictTo = (...roles) => (req, res, next) => {
    try {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    } catch (error) {
        next(error);
    }
};
