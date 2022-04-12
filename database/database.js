const Sequelize = require('sequelize');

const connecton = new Sequelize('menteSaudavel', 'root', '433743', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = connecton;