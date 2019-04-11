let jwt = require('jsonwebtoken');
let User = require('../db').import('../models/users');

module.exports = function (req, res, next) {
    if (req.method == 'OPTIONS') {
        next();
    } else {
        let sessionToken = req.headers.authorization;
        console.log(sessionToken, 'RIGHT HERE COME ON');
        if (!sessionToken) return res.status(403).send({ auth: false, message: 'no token provided' })
        else {
            jwt.verify(sessionToken, "SECRET", (err, decoded) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } })
                        .then(user => {
                            req.user = user;
                            next();
                        },
                            function () {
                                res.status(401).send({ error: 'not authed' })
                            })
                } else {
                    res.status(402).send({ error: 'super not authed' })
                }
            })
        }
    }
}