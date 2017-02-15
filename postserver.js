var express = require('express');
var app = express();
var reader = require("./json-file-reader");
var fs = require("fs");

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/searchuser', function(req, res) {
	res.render("search");
})

app.get('/', function(req, res) {
	res.render("search");
})

app.get('/createuser', function(req, res) {
	res.render("create");
})

app.get('/showusers', function(req, res) {
	reader("./user.json", function(objectData) {
		if(objectData.length === 0) {
			res.send("No users! Create some or get the hell out of here!");
		}
		else {
			res.render("show", {objectData});
		}
	})
})

app.post('/searchuserhandler', function(req, res) {
    var name = req.body.firstName;
	reader("./user.json", function(objectData) {
		for(var i=0;i < objectData.length; i++) {
	    	if(objectData[i]["firstName"] === name) {
	    		objectData = objectData[i]; //
	    		res.render("showsearch", {objectData});
	    	}
	    }
	 })
});	

app.post('/createuserhandler', function(req, res, next) {
	reader("./user.json", function(objectData) {
		objectData.push(req.body);
		json = JSON.stringify(objectData);
		fs.writeFile("user.json", json);	
		res.redirect("/");
	})
})

app.post('/livesearch', function(req, res) {
	var typed = req.body.typed;
	var suggestion = "";
	reader("./user.json", function(objectData) {
		for(var i=0;i < (objectData.length); i++) {
	    	var partialName = objectData[i]["firstName"].slice(0, typed.length);
	    	if( partialName === typed) {	    		
	    		suggestion = objectData[i]["firstName"];
	    		break;
	    	}
	    }
		res.send(suggestion);
	})
})	

var server = app.listen(3000, function() {
	var host = server.address().address;
	var post = server.address().port;

	console.log("Listing at http://%s:%s", host, post);
})

