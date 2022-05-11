const Sequelize = require('sequelize');
const connection = require('../database/database');

const SugestoesUser = connection.define('Sugestoes', {


    descrição: {
        type: Sequelize.STRING,
        allowNull: false
    },

    sugestoes: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

SugestoesUser.sync({alter: true})
module.exports = SugestoesUser;
