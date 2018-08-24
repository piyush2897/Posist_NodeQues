var moment = require('moment');
var MongoClient = require('mongodb').MongoClient;
var md5 = require('md5');
var url = "mongodb://localhost:27017/posist";

module.exports = function(app){
	app.get('/create_node',function(req,res){

	var time_stamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
	var Encrypted_data = encrypt(req.query.data);
	
	//Inserting into MongoDB 	
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;

	  	var c;
		var c=db.collection("main_login").count({},function(err,count)
		{
			if(err) throw err;
				c=count;
		});

		  var parent_node_ref,parent,child;
		  db.collection("Store_Nodes").find({}).toArray(function(err,resu){
		  	if(err) throw err;
		  	var flag=0;
		  	for(i=0;i<c;i=i+1)
		  	{
		  		parent = resu[i].data;
		  		if(resu[i].child != "")
		  		{
		  			child = resu[i].child_ref;
		  		}
		  		if(child + req.query.data <= parent)
		  		{
		  			flag =1;
		  			break;
		  		}
		  	}
		});

		  var genesis;
		  db.collection("Store_Nodes").find({}).toArray(function(err,resu){
		  		if(err) throw err;
		  		genesis = resu[0].node_id;
		  });

		  var hash = encrypt(time_stamp + req.query.data + req.query.node_no + req.query.node_id + genesis);

		  var obj = {
		  	timestamp: time_stamp , 
		  	data : Encrypted_data,
		  	node_no : req.query.node_no,
		  	node_id : req.query.node_id,
		  	ref_node_id : parent_node_ref,
		  	child_ref : ,
		  	genesis_ref_node : genesis,
		  	hash_val : hash 
		  };

		  if(flag == 1)
		  {
			  db.collection("Store_Nodes").insertOne(obj,function(err,res){
			  		if(err) throw err;
			  		console.log("1 document Inserted");
			  		db.close();
			  });
		  }
		});

	});
}