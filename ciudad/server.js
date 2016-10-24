var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');


var User = require('./models/user');
var pg = require('pg');



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


// passport config

/*passport.use(new LocalStrategy(
	function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }


	));*/
  var connectionString = "pg://postgres:root@localhost:5432/postgres";
  var client = new pg.Client(connectionString);



   // passport.use(new LocalStrategy(
   //  function(username, password, done){
   //    console.log("Login process:", username);
   //    client.query("SELECT * from ciudad_de_los_niños_development.user WHERE username="+username+" AND password="+password+" limit 1")
   //      .then((result)=> {
   //        return done(null, result);
   //      })
   //      .catch((err) => {
   //        console.log("/login: " + err);
   //        return done(null, false, {message:'Wrong user name or password'});
   //      });
   //  }));

   passport.use(new LocalStrategy(
    function(username, password, done){
      
      console.log("Login process:", username);
      client.connect(function (err) {
      if (err) throw err;     
        client.query("SELECT * from ciudad_de_los_niños_development.user WHERE username='"+username+"' limit 1",function(err,result){
          console.log(err);
          
          if(err){done(err)};
          if(!err){
            console.log("el result0 es:   ");
            console.log(result.rows[0]);
            done(null,result.rows[0]);
          };
          client.end(function (err) {
            if (err) throw err;
        });


        });
      });  
    }));


//passport.serializeUser();
//passport.deserializeUser(User.deserializeUser())

passport.serializeUser((user, done)=>{
    console.log("serialize ", user);
    done(null, user.id);
  });

  // passport.deserializeUser((id, done)=>{
  //   console.log("deserialize ", id);
  //   client.query("SELECT * FROM ciudad_de_los_niños_development.user" +"WHERE id ="+id)
  //   .then((user)=>{
  //     //log.debug("deserializeUser ", user);
  //     done(null, user);
  //   })
  //   .catch((err)=>{
  //     done(new Error(`User with the id ${id} does not exist`));
  //   })
  // });

passport.deserializeUser((id, done)=>{
  var client = new pg.Client(connectionString);
  console.log("deserialize ", id);
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
