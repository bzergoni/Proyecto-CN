var express = require('express');
var passport = require('passport');
var router = express.Router();


var lodash = require('lodash');


var pg = require('pg');
var connectionString = "pg://postgres:root@localhost:5432/postgres";


var client = new pg.Client(connectionString);
var User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res) {
  console.log(connectionString);
  res.render('index', { user : req.user});


});

router.get('/register', function(req, res) {
    res.render('register', { });
});





router.post('/register', function(req, res) {
 	
 	client.connect(function (err) {
  		if (err) throw err;
	 	client.query("insert into ciudad_de_los_niños_development.user values ('"+req.body.username+"','"+req.body.password+"');",function(err,result){
	 		passport.authenticate('local')(req, res, function () {
	            res.redirect('/');
	        });
	 		client.end(function (err) {
	      		if (err) throw err;
	    	});

	 	});
	    
    
    



})});







router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});



router.post('/login', passport.authenticate('local'), function(req, res) {

    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
