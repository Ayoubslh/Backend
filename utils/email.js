const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure you're using the dotenv package for environment variables

const sendEmail = async (options) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USERNAME,  
            pass: process.env.EMAIL_PASSWORD,  
        },
        tls: {
            rejectUnauthorized: false  
        }
    });

  
    const mailOptions = {
        from: `"Insurance Client Team" <${process.env.EMAIL_USERNAME}>`,  
        to: options.email,  
        subject: options.subject,  
        text: options.message,  
    };

   
   
        await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
