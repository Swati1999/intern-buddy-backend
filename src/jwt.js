const jwt = require('jsonwebtoken')
const Admin = require('./schema/admin')


const accessTokenSecret = 'youraccesstokensecret';



const generateToken = body => {
    return jwt.sign(body, accessTokenSecret)
}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader;

        jwt.verify(token, accessTokenSecret, (err, body) => {
            if (err || !body) {
                return res.sendStatus(403);
            }

            const {userId, role} = body
            if (role === 'admin') {
                Admin.findOne({userId}).then(user => {
                    req.user=user;
                    next();
                })
            }
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {authenticateJWT, generateToken}