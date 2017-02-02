var express = require('express');
var passport = require('passport');
var router = express.Router();


var lodash = require('lodash');


var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";


var client = new pg.Client(connectionString);
var User = require('../models/user');

var bcrypt = require('bcrypt');
const saltRounds = 10;

//carga de modelos

var persona_model = require("../models/persona");
var Persona = persona_model.persona;

var padrino_model = require("../models/padrino");
var Padrino = padrino_model.padrino;

var medioPago_model = require("../models/medioPago");
var MedioPago = medioPago_model.medioPago;

var debito_model = require("../models/debito");
var Debito = debito_model.debito;

var credito_model = require("../models/credito");
var Credito = credito_model.credito;

var programa_model = require("../models/programa");
var Programa = programa_model.programa;

var aporta_model = require("../models/aporta");
var Aporta = aporta_model.aporta;

var donante_model = require("../models/donante");
var Donante = donante_model.donante;

var contacto_model = require("../models/contacto");
var Contacto = contacto_model.contacto;

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


  		bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
	   		if (err) throw err;
		 	console.log("Lo que sigue es un hash");
		 	console.log(hash);
		 	var stringQuery="insert into ciudad_de_los_niños_development.user values ('"+req.body.username+"','"+hash+"');";
		 	console.log(stringQuery);
		 	client.query(stringQuery,function(err,result){
		 		client.end(function (err) {
		      		if (err) throw err;
		    	});

		 		passport.authenticate('local')(req, res, function () {
		            res.redirect('/');
		        });


		 	});


	});







})});

//   var id =req.query.idgame;



router.get('/insertarDonante', function(req, res) {
    res.render('insertarDonante', { user : req.user });
});

router.post('/insertarDonante', function(req, res) {
  console.log("POST DE MODIFICAR DONANTE, REQ.BODY.DNI="+req.body.dni)

   var donant = new Donante(req.body.dni)

  //
   var pers = new Persona(req.body.dni,req.body.n_y_ap);
   var padr = new Padrino(req.body.dni,req.body.email,req.body.tel_fijo,req.body.direccion,req.body.celular,req.body.fecha_nac,req.body.cod_postal);
   var donant = new Donante(req.body.dni,req.body.ocupacion,req.body.cuil_cuit);
//setTimeout(function(){}, 1000);
  var dni=req.body.dni

  pers.cargar()
  padr.cargar()
  donant.cargar()
  setTimeout(function(){
      if(!pers.existe){
        pers = new Persona(req.body.dni,req.body.n_y_ap);
        pers.insertar()

      };
      setTimeout(function(){
        if(!padr.existe){
          padr = new Padrino(req.body.dni,req.body.email,req.body.tel_fijo,req.body.direccion,req.body.celular,req.body.fecha_nac,req.body.cod_postal);
          padr.insertar()

        }
        setTimeout(function(){
          if(!donant.existe){
            donant = new Donante(req.body.dni,req.body.ocupacion,req.body.cuil_cuit);
            donant.insertar()

          }
          setTimeout(function(){
            res.redirect('/modificarDonante?dni='+dni);
          }, 1000);
        }, 1000);
      }, 1000);


  }, 1000);



});

router.get('/modificarDonante', function(req, res) {
    var dni =req.query.dni;
    if(dni){
      console.log()
      var pers = new Persona(dni);
      var padr = new Padrino(dni);
      var donant = new Donante(dni);
      setTimeout(function(){
        pers.cargar()
        setTimeout(function(){
          padr.cargar();
          setTimeout(function(){
            donant.cargar();
            setTimeout(function(){
              res.render('modificarDonante', { user : req.user,datospersona:pers,datospadrino:padr,datosdonante:donant });
            }, 50);
          }, 50);
        }, 50);
      }, 50);
    }else{res.render('modificarDonante', { user : req.user });}


});

router.post('/modificarDonanteRedir', function(req, res) {
  res.redirect('/modificarDonante?dni='+req.body.dniRedir);

});

router.post('/modificarDonante', function(req, res) {
  console.log("POST DE MODIFICAR DONANTE, REQ.BODY.DNI="+req.body.dni)

  var pers = new Persona(req.body.dni,req.body.n_y_ap);
  var padr = new Padrino(req.body.dni,req.body.email,req.body.tel_fijo,req.body.direccion,req.body.celular,req.body.fecha_nac,req.body.cod_postal);
  var donant = new Donante(req.body.dni,req.body.ocupacion,req.body.cuil_cuit);
  console.log(pers.show())
  console.log(padr.show())
  console.log(donant.show())
  var dni=req.body.dni
  setTimeout(function(){
    pers.actualizar()
    setTimeout(function(){
      padr.actualizar();
      setTimeout(function(){
        donant.actualizar();
        setTimeout(function(){
          res.redirect('/modificarDonante?dni='+dni);
        }, 50);
      }, 50);
    }, 50);
  }, 50);


});


router.get('/eliminarDonante', function(req, res) {
    var dni =req.query.dni;
    if(dni){
      console.log("entro al if de dni")
      var pers = new Persona(dni);
      var padr = new Padrino(dni);
      var donant = new Donante(dni);
      setTimeout(function(){
        pers.cargar()
        setTimeout(function(){
          padr.cargar();
          setTimeout(function(){
            donant.cargar();
            setTimeout(function(){
              console.log(donant)
              res.render('eliminarDonante', { user : req.user,datospersona:pers,datospadrino:padr,datosdonante:donant });
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }else{
      console.log("entro al else")
      res.render('eliminarDonante', { user : req.user });}


});
router.post('/eliminarDonanteRedir', function(req, res) {
  res.redirect('/eliminarDonante?dni='+req.body.dniRedir);

});

router.post('/eliminarDonante', function(req, res) {
  console.log("POST DE eliminar DONANTE, REQ.BODY.DNI="+req.body.dni)
  var donant = new Donante(req.body.dni);

  var dni=req.body.dni
  donant.eliminar()
  setTimeout(function(){
    res.redirect('')
  }, 50);


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
