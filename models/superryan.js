var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var users = sequelize.define("player", {
  user_name: Sequelize.STRING(3),
  user_score: {type: Sequelize.INTEGER, defaultValue: 0},
  character: {type: Sequelize.STRING, defaultValue: "Andrew"}
});

users.sync();

module.exports = users;


