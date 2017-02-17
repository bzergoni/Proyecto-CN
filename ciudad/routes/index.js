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
    var aport = new Aporte(dni)
    aport.eliminarPorDni()
    setTimeout(function(){
      res.redirect('/')
    }, 50);
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/insertarAporte', function(req, res) {
  var prog = new Programa()
  var cred= new Credito()
  prog.listaProgramas()
  cred.tiposTarjeta()
  setTimeout(function(){
      res.render('insertarAporte', { user : req.user,listaprogramas:prog.lista,listatarjetas:cred.listatarjetas });
  }, 1000);
});

router.post('/insertarAporte', function(req, res) {
   var dni=req.body.dni
   var donant = new Donante(req.body.dni)
   var tipo_pago=req.body.tipo_pago
   var debit = new Debito()
   debit.cbu=req.body.cbu
   var credit = new Credito(req.body.nro)
   credit.nombre_tarjeta=req.body.nombre_tarjeta
   var id=undefined
   var aport = new Aporta(req.body.dni,req.body.nombre_programa,req.body.monto,req.body.frecuencia,req.body.id)
//setTimeout(function(){}, 1000);

  donant.cargar()
  setTimeout(function(){
    if(donant.existeLogico){
      console.log("El donante existe logico!")
      if(tipo_pago=="DEBITO"){

        debit.cargar();
      }else {
        console.log("el tipo de pago es credito!")
        credit.cargar();
      }
      setTimeout(function(){

        if(debit.existe){
          id=debit.id
        }
        if(credit.existe) {
          console.log("El credito existe!")
          id=credit.id
        }
        if(id){
          console.log("El id existe!")
          setTimeout(function(){
            aport.exist()
            setTimeout(function(){
              if(!aport.existe){
                console.log("El aporte no existe! se insertara!")
                aport.id=id
                aport.insertar()
                setTimeout(function(){
                  res.redirect('/modificarAporte?nombre_programa='+req.body.nombre_programa+'&dni='+dni);
                }, 1000);
              }
            }, 1000);

          }, 1000);
        }

      }, 1000);

    };

  }, 1000);




});

router.get('/modificarAporte', function(req, res) {
    var dni =req.query.dni;
    var nombre_programa=req.query.nombre_programa
    if(dni &&  nombre_programa){
      console.log()
      var aport = new Aporta(dni,nombre_programa)
      aport.cargar()
      setTimeout(function(){
        res.render('modificarAporte', { user : req.user,datosaporte:aport });
      }, 50);
    }else{res.render('modificarAporte', { user : req.user });}


});

router.post('/modificarAporteRedir', function(req, res) {
  res.redirect('/modificarAporte?nombre_programa='+req.body.nombre_programaRedir+'&dni='+req.body.dniRedir);

});

router.post('/modificarAporte', function(req, res) {
  var aport = new Aporta()
  console.log(req.body)
  aport.nombre_programa = req.body.nombre_programa
  aport.dni= req.body.dni
  aport.cargar()
  setTimeout(function(){
    aport.frecuencia=req.body.frecuencia
    aport.monto=req.body.monto
    aport.actualizar()
    setTimeout(function(){
      console.log("el nombre programa que viene del query es"+req.body.nombre_programa)
      console.log("el dni que viene del query es"+req.body.dni)
      res.redirect('/modificarAporte?nombre_programa='+req.body.nombre_programa+'&dni='+req.body.dni);
    }, 500);
  }, 50);


});


router.get('/eliminarAporte', function(req, res) {
    var dni =req.query.dni;
    var nombre_programa=req.query.nombre_programa
    if(dni &&  nombre_programa){
      var aport = new Aporta(dni,nombre_programa);
      aport.cargar()
      setTimeout(function(){
        var pers = new Persona(dni)
        pers.cargar()
        setTimeout(function(){
          var debit = new Debito()
          debit.id=aport.id
          debit.cargarPorId()
          setTimeout(function(){
            var credit = new Credito()
            credit.id=aport.id
            credit.cargarPorId()
            setTimeout(function(){
              console.log(donant)
              res.render('eliminarAporte', { user : req.user,datospersona:pers,datoscredito:credit,datosdebito:debit,datosaporte:aport });
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }else{
      console.log("entro al else")
      res.render('eliminarAporte', { user : req.user });}


});
router.post('/eliminarAporteRedir', function(req, res) {
  res.redirect('/eliminarAporte?nombre_programa='+req.body.nombre_programaRedir+'&dni='+req.body.dniRedir);

});

router.post('/eliminarAporte', function(req, res) {
  var aporte = new Aporte(req.body.dni,req.body.nombre_programa);
  aporte.eliminar()
  setTimeout(function(){
    res.redirect('/')
  }, 50);


});
// router.get('/PRUEBALISTA', function(req, res) {
//   var prog = new Programa()
//   prog.listaProgramas()
//   setTimeout(function(){
//     console.log(prog.lista)
//     res.render('/')
//   }, 50);
//});

router.get('/donantesPorPrograma', function(req, res) {
    var nombre_programa=req.query.nombre_programa
    var prog = new Programa()
    prog.listaProgramas()
    setTimeout(function(){
      if(nombre_programa){
        client = new pg.Client(connectionString);

        client.connect(function (err) {
          if (err){console.log(err);}
          var query = "select * from  (Select dni from ciudad_de_los_niños_development.aporta where nombre_programa = '"+nombre_programa+"') ap  natural join (select * from ciudad_de_los_niños_development.persona ) per"
          console.log(query);

          client.query(query, function (err, result) {
            if (err) throw err;
            if(result.rows[0]){
              res.render('donantesPorPrograma', { user : req.user,lista:result.rows, listaprogramas:prog.lista  });
            }
            client.end(function (err) {
              if (err) {console.log(err)};
            });
          });
        });
      }else{
        res.render('donantesPorPrograma', { user : req.user, listaprogramas:prog.lista });
      }
    }, 1000);
});

router.post('/donantesPorProgramaRedir', function(req, res) {
  res.redirect('/donantesPorPrograma?nombre_programa='+req.body.nombre_programaRedir);

});
//-----------------------------------------------------------------------------------------------------------------------
router.get('/InformacionDeUnDonante', function(req, res) {
    var dni=req.query.dni;
    var donant = new Donante(dni);
    donant.cargar();
    donant.programasQueAporta();
    setTimeout(function(){
      if(dni){
        client = new pg.Client(connectionString);
        client.connect(function (err) {
          if (err){console.log(err);}
          var query = "select * from (select dni,ocupacion,cuil_cuit from ciudad_de_los_niños_development.donante where dni='"+dni+"' and existe=true) don natural join ciudad_de_los_niños_development.padrino padr natural join ciudad_de_los_niños_development.persona per";
          console.log(query);
          client.query(query, function (err, result) {
            if (err) throw err;
            if(result.rows[0]){
                console.log("INFODONANTE ES  "+result.rows[0].ocupacion+" y "+result.rows[0].cuil_cuit);
              res.render('InformacionDeUnDonante', { user : req.user,infoDonante:result.rows, listaProgramas:donant.listaProgramasAporta, datosdonante:donant  });
            }
            client.end(function (err) {
              if (err) {console.log(err)};
            });
          });
        });
      }else{
        res.render('InformacionDeUnDonante', { user : req.user});
      }
    }, 1000);


});

router.post('/InformacionDeUnDonanteRedir', function(req, res) {
    res.redirect('/InformacionDeUnDonante?dni='+req.body.dniRedir);
});

router.post('/InformacionDeUnDonanteRedir2', function(req, res) {
    res.redirect('/InformacionDeUnDonante');
});

router.get('/donantesPorBanco', function(req, res) {
    var nombre_banco=req.query.nombre_banco
    var banco = new Debito();
    banco.listaBancos()
    setTimeout(function(){
      if(nombre_banco){
        client = new pg.Client(connectionString);

        client.connect(function (err) {
          if (err){console.log(err);}
         	var query="select * from (select * from (select * from ciudad_de_los_niños_development.aporta) ap natural join (select * from ciudad_de_los_niños_development.persona) per) aper natural join (select * from ciudad_de_los_niños_development.debito where nombre_banco='"+nombre_banco+"') banc"
         //	var query = "﻿select * from (select * from (select * from ciudad_de_los_niños_development.aporta) ap natural join (select * from ciudad_de_los_niños_development.debito where nombre_banco = '"+nombre_banco+"') deb) apdeb natural join (select * from ciudad_de_los_niños_development.persona) per"
          console.log(query);
          client.query(query, function (err, result) {
            if (err) throw err;
            if(result.rows[0]){
            	console.log(result.rows)
              res.render('donantesPorBanco', { user : req.user,lista:result.rows, listabancos:banco.lista  });
            }
            client.end(function (err) {
              if (err) {console.log(err)};
            });
          });
        });
      }else{
        res.render('donantesPorBanco', { user : req.user, listabancos:banco.lista });
      }
    }, 1000);


});

router.post('/donantesPorBancoRedir', function(req, res) {
  res.redirect('/donantesPorBanco?nombre_banco='+req.body.nombre_bancoRedir);

});

router.get('/listadoDonantes', function(req, res) {
  client = new pg.Client(connectionString);

  client.connect(function (err) {
    if (err){console.log(err);}
    var query = "select * from ciudad_de_los_niños_development.donante  natural join ciudad_de_los_niños_development.persona  "
    console.log(query);

    client.query(query, function (err, result) {
      if (err) throw err;
      if(result.rows[0]){
        res.render('listadoDonantes', { user : req.user,lista:result.rows});
      }
      client.end(function (err) {
        if (err) {console.log(err)};
      });
    });
  });

});

router.get('/prueba', function(req, res) {
        res.render('prueba', { user : req.user});
  });
module.exports = router;
