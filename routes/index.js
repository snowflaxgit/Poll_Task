
/*
 * GET home page.
 */
// import database
var mongo = require('mongodb');
 
//create database server
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});

// create cartdb Database
db = new Db('poll', server);

// open database 
db.open(function(err, db) {
    if(!err) {
        db.collection('poll', {safe:true}, function(err, collection) {
            if (err) {
               }
			else{
		    	 collection.find().toArray(function(err, items) {
					 if(items.length == 0){
						 
					   	DB();
					    }
					});	
                }
			 
			 
        });
    }
});



exports.index = function(req, res){
	      res.render('index');

};


var DB = function(){
 
  var user = [
    {
		name: "Rahul Gandhi", 
		voting: 10	
	},
    {
		name: "Narendra Modi", 
		voting: 12	
	},
    {
		name: "Priyanka Vadra", 
		voting: 5	
	},
    {
		name: "Mulayam Singh Yadav", 
		voting: 8	
	},
    {
		name: "None Of Above", 
		voting: 6	
	}
	];


 db.collection('poll', function(err, collection) {
		
		collection.remove(); //remove database
        
		collection.insert(user, {safe:true}, function(err, result) {
			if(err){
				console.log(err);
			}
			else{
				
			}	
		});
    });


}; 