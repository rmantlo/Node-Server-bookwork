const Sequelize = require('sequelize');

const sequelize = new Sequelize('challengeworkoutlog', 'postgres', 'awesome11', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function () {
        console.log('connected to chellenge server')
    },
    function (err) {
        console.log(err)
    }
)

module.exports = sequelize;