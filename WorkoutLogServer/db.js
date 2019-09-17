const Sequelize = require('sequelize');

const sequelize = new Sequelize('challengeworkoutlog', 'postgres', 'awesome11', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function () {
        console.log('connected to challenge server')
    },
    function (err) {
        console.log(err)
    }
)


User = sequelize.import('./models/users');
Logs = sequelize.import('./models/log');
UserInfo = sequelize.import('./models/userinfo');

Logs.belongsTo(User);
User.hasMany(Logs);

User.hasOne(UserInfo);
UserInfo.belongsTo(User);

module.exports = sequelize;