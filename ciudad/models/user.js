/*
 * Represents a player in the game
 * @param name [String]: old state to intialize the new state
 */
var connectionString = "pg://postgres:root@localhost:5432/postgres";
var pg= require('pg')
var config = require('../config');

var client = new pg.Client(connectionString);

/*
 * User Schema
 */
function User(a){
  this.username= a.username,
  this.password= a.password
};

User.prototype.findOne=function(a,callback){
	
	var results = [];
	
	client.connect(function (err) {
		if (err) callback(err);
		client.query("SELECT * FROM ciudad_de_los_niños_development.user WHERE username = '"+a.username+"'", function (err, result) {
    		if (err) callback(err);
    		var usuario=null;
    		if(result.size()!=0){
    			usuario= new User(result.rows[0]);
    		}

    		
			callback(err, usuario);
			return usuario;
   			client.end(function (err) {
    			  if (err) throw err;
    		
    		});
  	});
	});

};

User.prototype.verifyPassword=function(contrasenia){
	if (this.password == contrasenia){return true;}
	return false;
}


module.exports.User = User;