var models = require("./../models/superryan.js");

function routes(app) {
	app.get("/", function(req, res){
		res.render("index");
	});

	app.get("/highscore", function(req, res) {
		res.render("highscore");
	});

	app.get("/create", function(req, res) {
		res.render("create");
	});

	app.get("/game", function(req, res) {
		res.render("game");
	});

	//create high score api route

	//create players api route
};

module.exports = routes;

