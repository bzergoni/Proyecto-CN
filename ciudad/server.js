var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');


var User = require('./models/user');
var pg = require('pg');

var bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


  var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
  var client = new pg.Client(connectionString);




   passport.use(new LocalStrategy(
    function(username, password, done){

      console.log("Login process:", username);
      client = new pg.Client(connectionString);
      client.connect(function (err) {
      if (err) throw err;
        client.query("SELECT * from ciudad_de_los_niños_development.user WHERE username='"+username+"' limit 1",function(err,result){


          if(err){done(err)};
          if(!err){

            if(!result.rows[0]){done(null,false);}
            if(result.rows[0]&&bcrypt.compareSync(password, result.rows[0].password)){done(null,result.rows[0])};
              }else{done(null,false);}




          client.end(function (err) {
            if (err) throw err;
        });


        });
      });
    }));



passport.serializeUser((user, done)=>{

    done(null, user.id);
  });


passport.deserializeUser((id, done)=>{
  var client = new pg.Client(connectionString);


  client.connect(function (err) {
    console.log(err);
    if (err) {throw err};
    client.query("SELECT * FROM ciudad_de_los_niños_development.user WHERE id ="+id,function(err,result){
      if(result.rows[0]){done(null,result.rows[0]);}
      if (err){done(new Error(`User with the id ${id} does not exist`))};
      client.end(function (err) {
        if (err) throw err;

        });
    });
  });

});










// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
