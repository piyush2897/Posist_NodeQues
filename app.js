var express =require('express');
var app =express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/posist";

var port= process.env.PORT || 3000; //http://127.0.0.1:3000
app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine','ejs');

var create_node = require('./create_node.js');

app.get('/',function(req,res){
	res.render('create_node');
});

create_node(app);

app.listen(port);