const protect = require('../authControllers/authController');
const AuthMid = (req, res, next) => {
    const { Authorization } = req.headers;
    const token = Authorization.split(' ')[1];
    // If token is signature is valid
    next();
    // else
    res.status(401).json({
        messsage: 'Unauthorized'
    })
}

module.exports = { AuthMid }