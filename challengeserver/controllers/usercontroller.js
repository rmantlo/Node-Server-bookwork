let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/users')
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

router.post('/signup', (req, res) => {
    let userName = req.body.user.username;
    let password = req.body.user.password;
    User.create({
        username: userName,
        passwordhash: bcrypt.hashSync(password, 10)
    })
        .then(
            function createSuccess(user) {
                let token = jwt.sign({ id: user.id }, 'SECRET', { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    sessionToken: token,
                    user: user,
                    message: 'user created'
                })
            },
            function createError(err) {
                res.status(500).json('creation failed', err)
            }
        )
        .catch(err => console.log(err))
})

router.post('/signin', (req, res) => {

    User.findOne({ where: { username: req.body.username } })
        .then(
            function (user) {
                if (user) {
                    bcrypt.compare(req.body.password, user.passwordhash, (err, matches) => {
                        if (matches) {
                            let token = jwt.sign({ id: user.id }, 'SECRET', { expiresIn: 60 * 60 * 24 })
                            res.status(200).json({
                                user: user,
                                "sessionToken": token,
                                message:'signed in'
                            })
                        } else {
                            res.status(500).json('pass not match')
                        }
                    })
                }else{
                    res.status(500).json('user and pass not correct')
                }
            },
            function(err){
                res.status(500).json('super fail')
            }
        )
})


module.exports = router;