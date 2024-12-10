const express =require('express');
const mongoose = require('mongoose');
const userRouter=require('./Routes/userRouter.js');
const insurerRouter=require('./Routes/userRouter.js');
require("express-async-errors");
const app = express();
const claimRouter=require("./Routes/ClaimRouter");
const globalErrorHandler = require('./controllers/erroController');

app.use(express.json());

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