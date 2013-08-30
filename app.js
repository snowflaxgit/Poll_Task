/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

// all environments
app.set('port', process.env.PORT || 3670);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var server=http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


var io = require('socket.io').listen(server, { log: true });


app.get('/', routes.index);

app.get('/user', function(req, res){
	   
	    
		db.collection('poll',function(err, collection) {
    	
		//collection.remove();
		collection.find().toArray(function(err, i) {
	   	res.json(i);
		});
	});
});


io.sockets.on('connection', function (socket) {	


socket.on('id', function(data) 
{ 
  var id=data.user_id;
  console.log(id);
  
  db.collection('poll', function(err, collection) {
			
			collection.update({'_id':new BSON.ObjectID(id)}, {$inc:{voting : 1}} , {safe:true}, function(err, result) {
			  if (err){
					res.send({'error':'An error has occurred'});
					}
			  else {
					console.log("voting updated");
					collection.find().toArray(function(err, items) {
					socket.broadcast.emit('update',{items : items});
					socket.emit('update',{items : items});
					});				
				}
			});
		});


});

});

