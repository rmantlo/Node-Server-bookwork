let router = require('express').Router();
let sequelize = require('../db')
let User = sequelize.import('../models/users');
let AuthTestModel = sequelize.import('../models/authtest');

//get all items for individual user
router.get('/getall', (req, res) => {
    let userid = req.user.id;

    AuthTestModel
        .findAll({ where: { owner: userid } })
        .then(function findAllSuccess(data) {
            res.json(data);
        }, function findAllError(err) {
            res.send(500, err.message);
        })
});

//post single item for individual user
router.post('/create', (req, res) => {
    let owner = req.user.id;
    let authTestData = req.body.authtestdata.item;

    AuthTestModel
        .create({
            authtestdata: authTestData,
            owner: owner
        })
        .then(
            function createSuccess(authtestdata) {
                res.json({
                    authtestdata: authtestdata
                });
            },
            function reactError(err) {
                res.send(500, err.message)
            }
        );
})

//get single item for individual user
router.get('/:id', (req, res) => {
    let data = req.params.id;
    let userid = req.user.id;

    AuthTestModel
        .findOne({
            where: { id: data, owner: userid }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
})

//delete item for individual user
router.delete('/delete/:id', (req, res) => {
    let data = req.params.id;
    let userid = req.user.id;

    AuthTestModel
        .destroy({
            where: { id: data, owner: userid }
        }).then(
            function deleteLogSuccess(data) {
                res.send("you removed a log");
            },
            function deleteLogError(err) {
                res.send(500, err.message);
            }
        )
})

//update an item for individual user
router.put('/update/:id', (req, res) => {
    let data = req.params.id;
    let authtestdata = req.body.authtestdata.item;

    AuthTestModel
        .update({
            authtestdata: authtestdata
        },
            { where: { id: data } }
        ).then(
            function updateSuccess(updatedLog) {
                res.json({ authtestdata: authtestdata })
            },
            function updateError(err) {
                res.send(500, err.message);
            }
        )
})

module.exports = router;