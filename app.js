const express =require('express');
const mongoose = require('mongoose');
require("express-async-errors");
const app = express();

app.use(express.json());


module.exports = app;