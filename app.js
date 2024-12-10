const express =require('express');
const mongoose = require('mongoose');
const userRouter=require('./Routes/userRouter.js');
require("express-async-errors");
const app = express();
const claimRouter=require("./Routes/ClaimRouter");
const globalErrorHandler = require('./controllers/erroController');

app.use(express.json());

app.use('/api/v1/claims',claimRouter);
app.use('/api/v1/users',userRouter);

app.use(globalErrorHandler)


module.exports = app;