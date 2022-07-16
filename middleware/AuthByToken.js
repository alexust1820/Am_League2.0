const jwt = require('jsonwebtoken');
const {jwtSecretCode} = require('../config.js')


module.exports = (req, res, next) => {
    if(req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token || token == '') {
            return res.status(403).json({message: "None authorized"})
        }

        const decodedData = jwt.verify(token, jwtSecretCode)
        req.email = decodedData.email
        next();

    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "None authorized"})
    }

};