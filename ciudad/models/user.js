
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var pg = require('pg')
var config = require('../config');

var client = new pg.Client(connectionString);


function User(a) {
    this.username = a.username,
        this.password = a.password
};

User.prototype.findOne = function(a, callback) {
    client = new pg.Client(connectionString);
    var results = [];

    client.connect(function(err) {
        if (err) callback(err);
        client.query("SELECT * FROM ciudad_de_los_niños_development.user WHERE username = '" + a.username + "'", function(err, result) {
            if (err) callback(err);
            var usuario = null;
            if (result.size() != 0) {
                usuario = new User(result.rows[0]);
            }


            callback(err, usuario);
            return usuario;
            client.end(function(err) {
                if (err) throw err;

            });
        });
    });

};

User.prototype.verifyPassword = function(contrasenia) {
    if (this.password == contrasenia) {
        return true;
    }
    return false;
}


module.exports.User = User;
