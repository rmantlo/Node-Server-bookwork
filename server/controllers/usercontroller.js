let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/users');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

router.post('/createuser', function (req, res) {
    let username = req.body.user.username;
    let pass = req.body.user.password;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass,10)
    }).then(
        function createSuccess(user) {
            let token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn:60*60*24});
            res.json({
                user: user,
                message: 'created',
                sessionToken: token,
            })
        },
        function createError(err) {
            res.send(500, err.message);
        }
    )
})

router.post('/signin', (req,res) =>{
    console.log(req.body.user.username);
    User.findOne({ where: { username: req.body.user.username }})
    .then(
        function(user){
            if(user){
                bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches){
                    if(matches){
                        let token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "Successfully authed",
                            sessionToken: token,
                        })
                    }else {
                        res.status(502).send({ error: "You failed bruh dude"});
                    }
                })
            } else {
                res.status(500).send({error: "failed to auth"});
            }
        },
        function(err){
            res.status(501).send({ error: "super fail bruh"})
        }
    );
})
module.exports = router;