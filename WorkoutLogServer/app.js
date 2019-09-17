let express = require('express');
let app = express();
let user = require('./controllers/usercontroller');
let log = require('./controllers/logcontroller');
let info = require('./controllers/userinfocontroller');
let sequelize = require('./db');
let bodyParser = require('body-parser');

sequelize.sync();
app.use(bodyParser.json());
app.use(require('./middleware/headers'));

app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.use('/userinfo', info);
app.use('/api', log);

app.listen(3000, function(){console.log('app is listening on 3000')});