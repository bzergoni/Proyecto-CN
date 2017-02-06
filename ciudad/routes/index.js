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
          if(donant.existe&&!(donant.existeLogico)){
            donant.insertarLOGIC()
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
    res.redirect('/')
  }, 50);


});

router.get('/insertarPrograma', function(req, res) {
    res.render('insertarPrograma', { user : req.user });
});

router.post('/insertarPrograma', function(req, res) {


   var program = new Programa(req.body.nombre_programa)

//setTimeout(function(){}, 1000);
  var nombre_programa=req.body.nombre_programa

  program.cargar();
  setTimeout(function(){
    if(!program.existe){
      program = new Programa(req.body.nombre_programa,req.body.descripcion);
      program.insertar()
    }
    if(program.existe && !(program.existeLogico)){
      program.insertarLOGIC();
    }
    setTimeout(function(){
      res.redirect('/modificarPrograma?nombre_programa='+nombre_programa);
    }, 1000);

  }, 1000);

});

router.get('/modificarPrograma', function(req, res) {
    var nombre_programa =req.query.nombre_programa;
    if(nombre_programa){
      var program = new Programa(nombre_programa);
      program.cargar();
      setTimeout(function(){
        res.render('modificarPrograma', { user : req.user,datosprograma:program});
      }, 50);


    }else{res.render('modificarPrograma', { user : req.user });}


});

router.post('/modificarProgramaRedir', function(req, res) {
  res.redirect('/modificarPrograma?dni='+req.body.nombre_programaRedir);

});

router.post('/modificarPrograma', function(req, res) {
  var program = new Program(req.body.nombre_programa,req.body.descripcion);
  console.log(program.show())
  var nombre_programa=req.body.nombre_programa
  program.actualizar()
  setTimeout(function(){
    res.redirect('/modificarPrograma?nombre_programa='+nombre_programa);
  }, 50);

});

router.get('/eliminarPrograma', function(req, res) {
    var nombre_programa =req.query.nombre_programa;
    if(nombre_programa){
      console.log("entro al if de nombre_programa")
      var program = new Programa(nombre_programa);
      program.cargar();
      setTimeout(function(){
        console.log(program)
        res.render('eliminarPrograma', { user : req.user,datosprograma:program });
      }, 1000);

    }else{
      console.log("entro al else")
      res.render('eliminarPrograma', { user : req.user });}
});

router.post('/eliminarProgramaRedir', function(req, res) {
  res.redirect('/eliminarPrograma?nombre_programa='+req.body.nombre_programaRedir);
});

router.post('/eliminarPrograma', function(req, res) {
  var program = new Programa(req.body.nombre_programa);
  program.eliminar()
  setTimeout(function(){
    res.redirect('/')
  }, 50);
});
//////////////////////////////////////////////////////////////////////////////////////////

router.get('/insertarDebito', function(req, res) {
    res.render('insertarDebito', { user : req.user });
});

router.post('/insertarDebito', function(req, res) {
   var debit = new Debito(req.body.nro_cuenta,req.body.cbu,req.body.nombre_titular,req.body.codigo_verificacion,req.body.tipo_cuenta,req.body.nombre_banco,req.body.sucursal_banco);
//setTimeout(function(){}, 1000);
   var cbu=req.body.cbu
   debit.exist();
   setTimeout(function(){
     if(!debit.existe){
       setTimeout(function(){
         debit.insertar()
         setTimeout(function(){
           res.redirect('/modificarDebito?cbu='+cbu);

         }, 1000);
       }, 1000);
     }else{
       res.redirect('/modificarDebito?cbu='+cbu);
     }

   }, 1000);
});


router.get('/modificarDebito', function(req, res) {
    var cbu =req.query.cbu;
    if(cbu){
      var debit = new Debito()
      debit.cbu=cbu
      debit.cargar();
      setTimeout(function(){
        debit.exist()

        setTimeout(function(){
          console.log(debit)
          res.render('modificarDebito', { user : req.user,datosdebito:debit});
        }, 500);
      }, 500);


    }else{res.render('modificarDebito', { user : req.user });}


});

router.post('/modificarDebitoRedir', function(req, res) {
  res.redirect('/modificarDebito?cbu='+req.body.cbuRedir);

});

router.post('/modificarDebito', function(req, res) {
  var debit = new Debito(req.body.nro_cuenta,req.body.cbu,req.body.nombre_titular,req.body.codigo_verificacion,req.body.tipo_cuenta,req.body.nombre_banco,req.body.sucursal_banco);
  debit.id=req.body.id
  console.log("dentro del post")
  console.log(debit.show())
  var cbu=req.body.cbu
  debit.actualizar()
  setTimeout(function(){
    setTimeout(function(){
      res.redirect('/modificarDebito?cbu='+cbu);
    }, 50);
  }, 50);

});

router.get('/eliminarDebito', function(req, res) {
    var cbu =req.query.cbu;
    if(cbu){
      console.log("entro al if de cbu")
      var debit = new Debito(cbu);
      debit.cargar();
      setTimeout(function(){
        console.log(debit)
        res.render('eliminarDebito', { user : req.user,datosdebito:debit });
      }, 1000);

    }else{
      console.log("entro al else")
      res.render('eliminarDebito', { user : req.user });}
});

router.post('/eliminarDebitoRedir', function(req, res) {
  res.redirect('/eliminarDebito?cbu='+req.body.cbuRedir);
});

router.post('/eliminarDebito', function(req, res) {
  var debit = new Debito(req.body.cbu);
  var cbu =req.body.cbu
  debit.eliminar()
  setTimeout(function(){
    res.redirect('/modificarDebito?cbu='+cbu)
  }, 50);
});


//----------------------------------------------------
router.get('/insertarCredito', function(req, res) {
    res.render('insertarCredito', { user : req.user });
});

router.post('/insertarCredito', function(req, res) {
  var tarj = new Credito(req.body.nro, req.body.tipo_tarjeta, req.body.nombre_titular, req.body.fecha_vencimiento, req.body.codigo_verificacion);
  //var tarj = new Credito(req.body.nro);
  tarj.exist();
  setTimeout(function(){
    if(!tarj.existe){
      tarj.insertar();
      setTimeout(function(){
      	res.redirect('/modificarCredito?nro='+req.body.nro);
    	})
	  }
	  else{
	  	res.redirect('/modificarCredito?nro='+req.body.nro);
	  }
	}, 1000);
});

router.get('/modificarCredito', function(req, res) {
    var nro =req.query.nro;
    if(nro){
      var tarj = new Credito(nro);
      setTimeout(function(){
        tarj.cargar();
        setTimeout(function(){
        	console.log(tarj);
            res.render('modificarCredito', { user : req.user, datoscredito:tarj});
        }, 500);
      }, 500);
    }else{res.render('modificarCredito', { user : req.user });}


});

router.post('/modificarCreditoRedir', function(req, res) {
  res.redirect('/modificarCredito?nro='+req.body.nroRedir);

});

router.post('/modificarCredito', function(req, res) {

  var tarj = new Credito(req.body.nro,req.body.nombre_tarjeta, req.body.nombre_titular, req.body.fecha_vencimiento, req.body.codigo_verificacion);
  var nro=req.body.nro
  setTimeout(function(){
    tarj.actualizar();
	setTimeout(function(){
      res.redirect('/modificarCredito?nro='+nro);
    }, 50);
  }, 50);
});


router.get('/eliminarCredito', function(req, res) {
	var nro =req.query.nro;
	if(nro){
	  var tarj = new Credito(nro);
	  setTimeout(function(){
	    tarj.cargar();
	    setTimeout(function(){
	    	console.log(tarj);
	     	res.render('eliminarCredito', { user : req.user, datoscredito:tarj});
	    }, 1000);
	  }, 1000);
	}else{
	  res.render('eliminarCredito', { user : req.user });
	}
});

router.post('/eliminarCreditoRedir', function(req, res) {
  res.redirect('/eliminarCredito?nro='+req.body.nroRedir);

});

router.post('/eliminarCredito', function(req, res) {
  var tarj = new Credito(req.body.nro);
  var nro=req.body.nro;
  tarj.eliminar()
  setTimeout(function(){
    res.redirect('/')
  }, 50);
});
//----------------------------------------------------

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


router.get('/insertarContacto', function(req, res) {
    res.render('insertarContacto', { user : req.user });
});

router.post('/insertarContacto', function(req, res) {
  console.log("POST DE MODIFICAR Contacto, REQ.BODY.DNI="+req.body.dni)
  var contact = new Contacto(req.body.dni)
  var padr = new Padrino(req.body.dni,req.body.email,req.body.tel_fijo,req.body.direccion,req.body.celular,req.body.fecha_nac,req.body.cod_postal);
  var pers = new Persona(req.body.dni,req.body.n_y_ap);
  var dni=req.body.dni

  pers.cargar();
  padr.cargar();
  contact.cargar();
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
            console.log("existe de contact: "+contact.existe);
            if(!contact.existe){
              console.log("entro al if de existe contact");
              contact = new Contacto(req.body.dni,req.body.fecha_primer_contacto,req.body.fecha_alta,req.body.fecha_baja,req.body.fecha_rechazo_adhesion,req.body.estado,req.body.dni_recomendador,req.body.comentario,req.body.relacion);
              contact.insertar()
            }
              setTimeout(function(){
                res.redirect('/modificarContacto?dni='+dni);
               }, 1000);
          }, 1000);
     }, 1000);
   }, 1000);
});

router.get('/modificarContacto', function(req, res) {
    var dni =req.query.dni;
    if(dni){
      console.log()
      var pers = new Persona(dni);
      var padr = new Padrino(dni);
      var contact = new Contacto(dni);
      setTimeout(function(){
        pers.cargar()
        setTimeout(function(){
          padr.cargar();
          setTimeout(function(){
            contact.cargar();
            setTimeout(function(){
              res.render('modificarContacto', { user : req.user,datospersona:pers, datospadrino:padr,datoscontacto:contact});
            }, 50);
          }, 50);
        }, 50);
      }, 50);
    }else{res.render('modificarContacto', { user : req.user });}
});

router.post('/modificarContactoRedir', function(req, res) {
  res.redirect('/modificarContacto?dni='+req.body.dniRedir);
});

router.post('/modificarContacto', function(req, res) {
  console.log("POST DE MODIFICAR Contacto, REQ.BODY.DNI="+req.body.dni)

  var pers = new Persona(req.body.dni,req.body.n_y_ap);
  var padr = new Padrino(req.body.dni,req.body.email,req.body.tel_fijo,req.body.direccion,req.body.celular,req.body.fecha_nac,req.body.cod_postal);
  var contact = new Contacto(req.body.dni,req.body.fecha_primer_contacto,req.body.fecha_alta,req.body.fecha_baja,req.body.fecha_rechazo_adhesion,req.body.estado,req.body.dni_recomendador,req.body.comentario,req.body.relacion);

  console.log(pers.show());

  console.log(contact.show());
  var dni=req.body.dni

    pers.actualizar();
    setTimeout(function(){
      padr.actualizar();
      setTimeout(function(){
        contact.actualizar();
          setTimeout(function(){
            console.log("dentro del ultimo setTimeout antes del redirect");
            res.redirect('/modificarContacto?dni='+dni);
          }, 50);
      }, 50);
  }, 50);
});


router.get('/eliminarContacto', function(req, res) {
    var dni =req.query.dni;
    if(dni){
      console.log("entro al if de dni")
      var pers = new Persona(dni);
      var contact = new Contacto(dni);
      var padr = new Padrino(dni);
      pers.cargar()
      contact.cargar();
      padr.cargar();
      setTimeout(function(){
        res.render('eliminarContacto', { user : req.user,datospersona:pers,datospadrino:padr,datoscontacto:contact});
      }, 1000);
    }else{
      console.log("entro al else")
      res.render('eliminarContacto', { user : req.user });}
});

router.post('/eliminarContactoRedir', function(req, res) {
  res.redirect('/eliminarContacto?dni='+req.body.dniRedir);
});

router.post('/eliminarContacto', function(req, res) {
  console.log("POST DE eliminar Contacto, REQ.BODY.DNI="+req.body.dni)
  var contact = new Contacto(req.body.dni);

  var dni=req.body.dni
  contact.eliminar()
  setTimeout(function(){
    res.redirect('/')
  }, 50);
});


module.exports = router;
