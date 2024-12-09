const dotenv=require('dotenv');
const app= require('./app');
const connectDB = require('./utils/connectDB');
const { connect } = require('mongoose');
dotenv.config({path:'./config.env'})




const port=process.env.PORT;


const server =app.listen(port,()=>{
    try{
      console.log("server connected ...");
      connectDB();
      console.log("connet to DB successe ...");
    } catch(err){
      console.log("could not connect ...");
    }

})
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
});