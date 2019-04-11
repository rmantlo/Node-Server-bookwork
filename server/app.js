require('./node_modules/dotenv/lib/main').config();

let express = require('./node_modules/express');
let app = express();
let test = require('./controllers/testcontroller');
let authTest = require('./controllers/authtestcontroller');
let user = require('./controllers/usercontroller');

let sequelize = require('./db');
let bodyParser = require('./node_modules/body-parser');

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


