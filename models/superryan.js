var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var users = sequelize.define("user2", {
  name: Sequelize.STRING,
  game_score: Sequelize.INTEGER,
  current_high_score_: Sequelize.INTEGER,
  character: Sequelize.STRING
});

users.sync();

module.exports = users;
