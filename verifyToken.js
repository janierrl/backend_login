const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require ('./config.js');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;
    next();
}

module.exports = verifyToken;