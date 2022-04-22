const Sequelize = require('sequelize');
const connection = require('../database/database');

const SugestoesUser = connection.define('Sugestoes', {

    sugestoes: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

SugestoesUser.sync({alter: true})
module.exports = SugestoesUser;
