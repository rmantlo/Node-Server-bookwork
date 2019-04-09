require('dotenv').config();

let express = require('express');
let app = express();
let test = require('./controllers/testcontroller');
let authTest = require('./controllers/authtestcontroller');
let user = require('./controllers/usercontroller');

let sequelize = require('./db');
let bodyParser = require('body-parser');

sequelize.sync(); // tip: {force: true} for resetting tables

app.use(bodyParser.json())
app.use(require('./middleware/headers'));

app.use('/api/test', function (req, res) {
    res.send("This is data from the /api/test endpoint. It's from the server.");
});
app.use('/test', test)
app.use('/api/user', user);
app.use(require('./middleware/validate-session'));
app.use('/authtest', authTest);

app.listen(3000, function () {
    console.log('yo my dudes.')
})


