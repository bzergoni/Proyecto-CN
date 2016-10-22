var express = require('express');
var passport = require('passport');
var router = express.Router();


var lodash = require('lodash');






/* GET home page. */
router.get('/', function (req, res) {
  console.log(connectionString);
  res.render('index', { user : req.user ,idgame:req.idgame});


});

router.get('/register', function(req, res) {
    res.render('register', { });
});





router.post('/register', function(req, res) {
    User.register(req.body.username, req.body.password,)


    passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });



});







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
