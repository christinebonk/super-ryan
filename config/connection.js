// Set up MySQL connection.
var mysql = require("mysql2");
var Sequelize = require("sequelize");
var sequelize = new Sequelize("super_ryan", "root", "password", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
