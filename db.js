const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('committee', 'test', 'test', {
  host: 'localhost',
  dialect: 'postgres',
  // logging: false, // disable SQL logs
  logging: console.log, // shows actual SQL
});

module.exports = sequelize;

