const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./Routes/userRouter.js');
const insurerRouter = require('./Routes/insurerRouter.js');

const botRouter=require('./Routes/botRoutes.js');

const expertRouter = require('./Routes/expertRouter.js')

require("express-async-errors");
const app = express();
const claimRouter = require("./Routes/ClaimRouter");
const globalErrorHandler = require('./controllers/erroController');
const cors = require('cors');

app.use(express.json());

//routes

app.use('/app/aississtant', botRouter)

app.use(cors({ origin: '*' }));

app.use('/api/claims', claimRouter);
app.use('/api/users', userRouter);
app.use('/api/insurer', insurerRouter);
app.use('/api/experts', expertRouter);

//error handling middleware
app.use(globalErrorHandler)


module.exports = app;