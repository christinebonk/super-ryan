var express = require("express");
var app = express();
var port = 3000;
var path = require("path");
var routes = require("./controllers/controllers.js");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

routes(app);

app.listen(process.env.PORT || port, function(){
	console.log("Listening on PORT " + port);
});









