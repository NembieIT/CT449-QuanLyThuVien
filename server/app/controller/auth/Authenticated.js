const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//401 unauthorized
//403 forbiden
const Authenticated = {
    Authentication: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.sendStatus(401);
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(401);
            req.user = user;
            next();
        })
    },
    AuthenticationAD: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.sendStatus(401);
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(401);
            if (user.role !== "NV" && user.role !== "AD") return res.sendStatus(403);
            req.user = user;
            next();
        })
    }
}

module.exports = Authenticated;