let express = require('../node_modules/express');
let router = express.Router();
let sequelize = require('../db');
let TestModel = sequelize.import('../models/test')

router.get('/', function (req, res) {
    res.send('hey this is a test route')
});
router.get('/helloclient', function (req, res) {
    res.send('this is a message from the server to the client.')
})
router.get('/about', function (req, res) {
    res.send('this is an about route')
});
router.get('/contact', function (req, res) {
    res.send({
        user: "Becky",
        email: "becky@becky.com"
    })
});
router.get('/projects', function (req, res) {
    res.send([
        'Project 1',
        'Project 2'
    ])
});
router.get('/mycontacts', function (req, res) {
    res.send([
        {
            user: "Kenn",
            email: 'Kenn@kenn.com'
        },
        {
            "user": "Sarah",
            "email": "sarah@sarah.com",
        },
        {
            "user": "Nancy",
            "email": "Nancy@nancy.com"
        }
    ])
})

router.post('/one', function (req, res) {
    res.send("test 1 went through")
})
router.post('/two', function (req, res) {
    let testData = "Test data for endpoint two";

    TestModel
        .create({
            testdata: testData
        }).then(dataFromDatabase => {
            res.send("test two went through")
        })
})

router.post('/three', function (req, res) {
    let testData = req.body.testdata.item;

    TestModel
        .create({
            testdata: testData
        })
    res.send("test three went through")
    console.log('test three went through')
})

router.post('/four', function (req, res) {
    let testData = req.body.testdata.item;
    TestModel
        .create({ testdata: testData })
        .then(
            function message() {
                res.send('Test four went through')
            }
        )
})

router.post('/five', function (req, res) {
    let testData = req.body.testdata.item;
    TestModel
        .create({ testdata: testData })
        .then(
            function message(data) {
                res.send(data);
            }
        )
})

router.post('/six', function (req, res) {
    let testData = req.body.testdata.item;
    TestModel
        .create({ testdata: testData })
        .then(
            function message(testdata) {
                res.json({ testdata: testdata })
            }
        )
})

router.post('/seven', function (req, res) {
    let testData = req.body.testdata.item;

    TestModel
        .create({ testdata: testData })
        .then(
            function createSuccess(testdata) {
                res.json({ testdata: testdata })
            },
            function createError(err) {
                res.send(500, err.message);
            }
        )
})

router.get('/one', (req, res) => {
    TestModel
        .findAll({
            attributes: ['id', 'testdata']
        })
        .then(function findAllSuccess(data) {
            //console.log("Controller data:", data);
            res.json(data);
        },
            function findAllError(err) {
                res.send(500, err.message);
            });
});


module.exports = router;