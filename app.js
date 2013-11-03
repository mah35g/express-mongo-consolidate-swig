var express = require('express');
var cons = require('consolidate');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var mongoclient = new MongoClient(new Server('localhost', 27017, 
	{'native_parser' : true}));

var db = mongoclient.db('course');

app.get('/', function(req, res){
	// res.send("Hello World!"); // Simple 
	// res.render('hello', {'name':'Swig'}); // Render template

	db.collection('hello_mongo_express').findOne({}, function(err, doc) {
		res.render('hello', doc);
	});
	
}); 

app.get('/:name', function(req, res){
	var name = req.params.name;
	var getvar1 = req.query.getvar1;
	var getvar2 = req.query.getvar2;

	res.render('Hello', {name:name, getvar1:getvar1, getvar2:getvar2});
});

app.get('*', function(req, res){
	res.send("page not found", 404);
});

// express starts listening once mongo opens call to db
mongoclient.open(function(err, mongoclient){
	if(err) throw err;
	app.listen(8080);
	console.log("Express Server listening on port 8080..");
});
