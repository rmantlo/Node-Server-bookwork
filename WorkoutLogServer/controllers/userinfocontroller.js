let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let UserInfo = sequelize.import('../models/userinfo');
let User = sequelize.import('../models/users');
let Log = sequelize.import('../models/log');

//get user table info
router.get('/getuser', (req, res) => {
    User.findOne({ where: { id: req.user.id }, include: ['userinfo', 'logs'] })
        .then(info => res.status(200).json(info))
        .catch(err => res.status(500).json(err))
})
//create user info
router.post('/createuserinfo', (req, res) => {
    UserInfo.findOne({ where: { userId: req.user.id } })
        .then(user => {
            if (user != null) {
                res.status(500).json({ message: "This User already has a created User Info profile." })
            }
            else {
                UserInfo.create({
                    dateOfBirth: req.body.userInfo.dateOfBirth,
                    age: req.body.userInfo.age,
                    heightInInches: req.body.userInfo.heightInInches,
                    weightInPounds: req.body.userInfo.weightInPounds,
                    goal: req.body.userInfo.goal,
                    userId: req.user.id
                })
                    .then(userInfo => res.status(200).json(userInfo))
                    .catch(err => console.log(err));
            }
        })
})
//get user info
router.get('/getuserinfo', (req, res) => {
    UserInfo.findOne({
        where: {
            userId: req.user.id
        },
        include: 'user'
    })
        .then(function createSuccess(data) {
            res.status(200).json({
                message: 'User Info found',
                data: data
            })
        }).catch(err => res.status(500).json('User Info not found', err))
})
//update user info
router.put('/updateuserinfo', (req, res) => {
    UserInfo.update(req.body.userInfo, { where: { userId: req.user.id } })
        .then(function createSuccess(data) {
            res.status(200).json({
                message: 'User Info updated',
                data: data
            })
        }).catch(err => res.status(500).json('User Info not updated', err))
})
//delete user info

module.exports = router;