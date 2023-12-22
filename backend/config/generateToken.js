const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretkey = process.env.JWT_SECRET || 'secretkey';
const generateToken = (id) => {
    return jwt.sign({id},secretkey,{
        expiresIn:'30d'
    })
}
module.exports = generateToken;