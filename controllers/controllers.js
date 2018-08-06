var db = require("./../models/superryan.js");
var bodyparser = require("body-parser");


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
	app.get("/api/highscore", function(req,res) {
		db.findAll({
			order: [['user_score', 'DESC']]
		}).then(function(result) {
			res.json(result);
		});
	});

	//create players api route
	app.post("/api/player", function(req,res) {
		 db.create({
	      user_name: req.body.name,
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
	app.put("/api/player", function(req,res) {
		 db.update(
		 {user_score: req.body.score},
		 {where: {user_name: req.body.user}}
		 ).then(function(res) {
	    });
	});
};

module.exports = routes;
