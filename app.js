const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./Routes/userRouter.js');
const insurerRouter = require('./Routes/insurerRouter.js');
require("express-async-errors");
require('./authControllers/authController.js'); // Path to your Passport setup file
const app = express();
const claimRouter = require("./Routes/ClaimRouter");
const globalErrorHandler = require('./controllers/erroController');
const session = require('express-session');
const cors = require('cors');

app.use(express.json());

//routes
app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/api/claims', claimRouter);
app.use('/api/users', userRouter);
app.use('/api/insurer', insurerRouter);
// app.use('api/experts',)

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: 'An unexpected error occurred!' });
});

app.use(globalErrorHandler)


module.exports = app;