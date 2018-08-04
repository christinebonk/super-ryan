var db = require("./../models/superryan.js");
var bodyparser = require("body-parser")

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

	//pull high score api route - get the top ten high scores
	

	//create players api route
	app.post("/api/player", function(req,res) {
		 db.create({
	      name: req.body.name,
	      character: req.body.character
	    }).then(function(res) {
	    });
	});

	//pull user profiles
	app.get("/api/player", function(req,res) {
		db.findAll({}).then(function(result) {
	      res.json(result);
	    });
	});

	//create update player score api
};

module.exports = routes;




