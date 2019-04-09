let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = require('../models/users');
let Log = sequelize.import('../models/log');

router.get('/getall', (req, res) => {
    Log.findAll({ where: { owner: req.user.id } })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(500).json('no users found', err))
})

router.post('/createlog', (req, res) => {
    Log.create({
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner: req.user.id
    })
        .then(
            function createSuccess(data) {
                res.status(200).json({
                    message: 'log created',
                    data: data
                })
            }).catch(err => res.status(500).json('log not created', err))
})

router.get('/:id', (req, res) => {
    Log.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(500).json(err, 'not found'))
})

router.put('/update/:id', (req, res) => {
    Log.update({
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result
    },
        { where: { id: req.params.id } })
        .then(user => res.status(200).json({
            description: req.body.description,
            definition: req.body.definition,
            result: req.body.result,
            message: "log updated"
        }))
        .catch(err => res.status(500).json('log not updated'))
})

router.delete('/delete/:id', (req, res) => {
    Log.destroy({ where: { id: req.params.id, owner: req.user.id } })
        .then(function deleteSuccess(data) {
            res.status(200).json('log removed')
        }, function deleteError(err) {
            res.status(500).json('log not delete')
        })
})

module.exports = router;
