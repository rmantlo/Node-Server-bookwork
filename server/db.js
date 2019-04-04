const Sequelize = require('sequelize');

const sequelize = new Sequelize('workoutlog', 'postgres', 'awesome11', {
    host:'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function(){
        console.log('connected to workoutlog postgress database')
    },
    function(err){
        console.log(err)
    }
)

module.exports = sequelize;