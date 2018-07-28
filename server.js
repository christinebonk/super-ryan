var express = require("express");
var app = express();
var port = 3000;
var path = require("path");
var routes = require("controllers/contorllers.js");

app.listen(port,function() {
	console.log("listening on port: " + port)
})

app.use(express.static(path.join(__dirname, 'public')));

routes(app);