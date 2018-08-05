var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var users = sequelize.define("user3", {
  user_name: Sequelize.STRING,
  user_score: Sequelize.INTEGER,
  character: Sequelize.STRING
});

users.sync();

module.exports = users;


