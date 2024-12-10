const express =require('express');
const mongoose = require('mongoose');
const userRouter=require('./Routes/userRouter.js');
const insurerRouter=require('./Routes/userRouter.js');
require("express-async-errors");
require('./authControllers/authController.js'); // Path to your Passport setup file
const app = express();
const claimRouter=require("./Routes/ClaimRouter");
const globalErrorHandler = require('./controllers/erroController');
const session = require('express-session');
const passport = require('passport');

app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
//routes
app.use('/api/v1/claims',claimRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/insurer',insurerRouter);

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: 'An unexpected error occurred!' });
});

app.use(globalErrorHandler)


module.exports = app;