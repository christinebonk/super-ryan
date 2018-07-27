var models = require("./../models/superryan.js");
var express = require("express");
var app = express();

function routes(app) {
	app.get("/", function(req, res){
		res.render("index");
	});

	app.get("/highscores", function(req, res) {
		res.render("highscores");
	});

	app.get("/charactercreate", function(req, res) {
		res.render("charactercreate");
	});

	app.get("/game", function(req, res) {
		res.render("game");
	});

};

module.exports = routes;

