var express = require('express');
var passport = require('passport');
var router = express.Router();

var lodash = require('lodash');


var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";


const time=500;


var client = new pg.Client(connectionString);
var User = require('../models/user');

var bcrypt = require('bcrypt-nodejs');
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

var cobro_model = require("../models/cobro");
var Cobro = cobro_model.cobro;




/* GET home page. */
router.get('/', function (req, res) {
  console.log(connectionString);
  res.render('index', { user : req.user});


});

router.get('/register', function(req, res) {
    console.log(req.user);
    res.render('register', {user:req.user });
});





router.post('/register', function(req, res) {
  client = new pg.Client(connectionString);
  client.connect(function(err) {


    bcrypt.hash(req.body.password, null,null, function(err, hash) {
      if (err) throw err;
      console.log("Lo que sigue es un hash");
      console.log(hash);
      var stringQuery = "insert into ciudad_de_los_niños_development.user values ('" + req.body.username + "','" + hash + "',default,2);";
      console.log(stringQuery);
      client.query(stringQuery, function(err, result) {
        client.end(function(err) {
          if (err) throw err;
        });

        passport.authenticate('local')(req, res, function() {
          res.redirect('/');
        });


      });

    });

  })
});





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
//setTimeout(function(){}, time);
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
            donant = new Donante(req.body.dni,req.body.ocupacion,req.body.cuil_cuit,req.body.comentario,req.body.fecha_alta,req.body.fecha_baja,req.body.origen);
            donant.insertar()

          }
          if(donant.existe&&!(donant.existeLogico)){
            donant.insertarLOGIC()
          }

          setTimeout(function(){
            res.redirect('/modificarDonante?dni='+dni);
          }, time);
        }, time);
      }, time);


  }, time);



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
            }, time);
          }, time);
        }, time);
      }, time);
    }else{res.render('modificarDonante', { user : req.user });}


});

router.post('/modificarDonanteRedir', function(req, res) {
  res.redirect('/modificarDonante?dni='+req.body.dniRedir);

});

router.post('/modificarDonante', function(req, res) {
  console.log("POST DE MODIFICAR DONANTE, REQ.BODY.DNI="+req.body.dni)

  var pers = new Persona(req.body.dni,req.body.n_y_ap);
  var padr = new Padrino(req.body.dni,req.body.email,req.body.tel_fijo,req.body.direccion,req.body.celular,req.body.fecha_nac,req.body.cod_postal);
  var donant = new Donante(req.body.dni,req.body.ocupacion,req.body.cuil_cuit,req.body.comentario,req.body.fecha_alta,req.body.fecha_baja,req.body.origen);
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
        }, time);
      }, time);
    }, time);
  }, time);


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
            }, time);
          }, time);
        }, time);
      }, time);
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
    var aport = new Aporta(dni)
    aport.eliminarPorDni()
    setTimeout(function(){
      res.redirect('/listadoDonantes')
    }, time);
  }, time);


});

router.get('/insertarPrograma', function(req, res) {
    res.render('insertarPrograma', { user : req.user });
});

router.post('/insertarPrograma', function(req, res) {


   var program = new Programa(req.body.nombre_programa)

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
      res.redirect('/listadoProgramas');
    }, time);

  }, time);

});

router.get('/modificarPrograma', function(req, res) {
    var nombre_programa =req.query.nombre_programa;
    if(nombre_programa){
      var program = new Programa(nombre_programa);
      program.cargar();
      setTimeout(function(){
        res.render('modificarPrograma', { user : req.user,datosprograma:program});
      }, time);


    }else{res.render('modificarPrograma', { user : req.user });}


});

router.post('/modificarProgramaRedir', function(req, res) {
  res.redirect('/modificarPrograma?nombre_programa='+req.body.nombre_programaRedir);

});

router.post('/modificarPrograma', function(req, res) {
  var program = new Programa(req.body.nombre_programa,req.body.descripcion);
  console.log("AHORA VIENE EL SHOW DE PROGRAM");
  console.log(program.show());
  var nombre_programa=req.body.nombre_programa;
  program.actualizar();
  setTimeout(function(){
    res.redirect('/listadoProgramas');
  }, time);

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
      }, time);

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
    res.redirect('/listadoProgramas')
  }, time);
});


router.get('/insertarDebito', function(req, res) {
    res.render('insertarDebito', { user : req.user });
});

router.post('/insertarDebito', function(req, res) {
   var debit = new Debito(req.body.nro_cuenta,req.body.cbu,req.body.nombre_titular,req.body.codigo_verificacion,req.body.tipo_cuenta,req.body.nombre_banco,req.body.sucursal_banco);
//setTimeout(function(){}, time);
   var cbu=req.body.cbu
   debit.exist();
   setTimeout(function(){
     if(!debit.existe){
       setTimeout(function(){
         debit.insertar()
         setTimeout(function(){
           res.redirect('/modificarDebito?cbu='+cbu);

         }, time);
       }, time);
     }else{
       res.redirect('/modificarDebito?cbu='+cbu);
     }

   }, time);
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
      }, time);

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
	}, time);
});

router.get('/modificarCredito', function(req, res) {
    var nro =req.query.nro;
    var nombre_tarjeta=req.query.nombre_tarjeta
    if(nro && nombre_tarjeta){
      var tarj = new Credito(nro);
      tarj.nombre_tarjeta=nombre_tarjeta;
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
	    }, time);
	  }, time);
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
  },time);
});
//----------------------------------------------------






router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});



router.post('/login', passport.authenticate('local',{failureRedirect: '/loginerror' }), function(req, res) {

    res.redirect('/');
});

router.get('/loginerror', function(req, res) {
  error="error";
    res.render('login',{errorlogin:error});
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
              console.log("entro al if de existe contact"+" ... con estado: "+req.body.estado);
              contact = new Contacto(req.body.dni,req.body.fecha_primer_contacto,req.body.fecha_rechazo_adhesion,req.body.estado,req.body.dni_recomendador,req.body.comentario,req.body.relacion,req.body.fecha_ult_contacto);
              contact.insertar()
            }
              setTimeout(function(){
                res.redirect('/modificarContacto?dni='+dni);
              }, time);
          }, time);
     }, time);
   }, time);
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
            }, time);
          }, time);
        }, time);
      }, time);
    }else{res.render('modificarContacto', { user : req.user });}
});

router.post('/modificarContactoRedir', function(req, res) {
  res.redirect('/modificarContacto?dni='+req.body.dniRedir);
});

router.post('/modificarContacto', function(req, res) {
  console.log("POST DE MODIFICAR Contacto, REQ.BODY.DNI="+req.body.dni)

  var pers = new Persona(req.body.dni,req.body.n_y_ap);
  var padr = new Padrino(req.body.dni,req.body.email,req.body.tel_fijo,req.body.direccion,req.body.celular,req.body.fecha_nac,req.body.cod_postal);
  var contact = new Contacto(req.body.dni,req.body.fecha_primer_contacto,req.body.fecha_rechazo_adhesion,req.body.estado,req.body.dni_recomendador,req.body.comentario,req.body.relacion,req.body.fecha_ult_contacto);

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
          }, time);
      }, time);
  }, time);
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
      }, time);
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
  }, time);
});

router.post('/insertarAporte', function(req, res) {
   var dni=req.body.dni
   var donant = new Donante(req.body.dni)
   var tipo_pago=req.body.tipo_pago
   var debit = new Debito(req.body.nro_cuenta,req.body.cbu, req.body.nombre_titular, req.body.codigo_verificacion, req.body.tipo_cuenta, req.body.nombre_banco,req.body.sucursal_banco)
   var credit = new Credito(req.body.nro, req.body.nombre_tarjeta, req.body.nombre_titular,req.body.fecha_vencimiento,req.body.codigo_verificacion)
   var id_mediodepago = req.body.id_mediodepago
   var aport = new Aporta(req.body.dni,req.body.nombre_programa,req.body.monto,req.body.frecuencia,req.body.id_mediodepago,req.body.fecha_aporte,req.body.estado_cobro)
//setTimeout(function(){}, time);
  donant.cargar()
  setTimeout(function(){
    if(donant.existe){
      console.log("el donante existe")
      if(id_mediodepago > 0 ){
        aport.insertar()
        setTimeout(function(){res.redirect('/listadoAportes');}, time)
         //ver si funciona sino ponr timmeout
      }else{
        if(tipo_pago=="DEBITO"){debit.insertar()}else {credit.insertar();console.log(credit)}
        setTimeout(function(){

          if(tipo_pago=="DEBITO"){debit.cargar()}else {credit.cargar();console.log(credit)}
          setTimeout(function(){
            if(tipo_pago=="DEBITO"){id_mediodepago=debit.id}else {id_mediodepago=credit.id}
            console.log("id medio de pago ="+id_mediodepago)
            aport.id=id_mediodepago
            console.log(aport)
            aport.insertar()
            setTimeout(function(){res.redirect('/listadoAportes');}, time)
          }, time);
        }, time);
      }




  }else{res.redirect('/insertarAporte');}

  }, time);




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
      }, time);
    }else{res.render('modificarAporte', { user : req.user });}


});

router.post('/modificarAporteRedir', function(req, res) {
  res.redirect('/modificarAporte?nombre_programa='+req.body.nombre_programaRedir+'&dni='+req.body.dniRedir);

});

router.post('/modificarAporte', function(req, res) {
  var aport = new Aporta()
  aport.nombre_programa = req.body.nombre_programa
  aport.dni= req.body.dni
  aport.cargar()
  setTimeout(function(){
    console.log(aport)
    aport.frecuencia=req.body.frecuencia;
    aport.monto=req.body.monto;
    console.log("EL ESTADO COBRO ES:",+req.body.estado_cobro)
    aport.estado_cobro = req.body.estado_cobro;
    aport.actualizar()
    setTimeout(function(){
      console.log("el nombre programa que viene del query es"+req.body.nombre_programa)
      console.log("el dni que viene del query es"+req.body.dni)
      //res.redirect('/modificarAporte?nombre_programa='+req.body.nombre_programa+'&dni='+req.body.dni);
      res.redirect('/listadoAportes');
    }, time);
  }, time);


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

              res.render('eliminarAporte', { user : req.user,datospersona:pers,datoscredito:credit,datosdebito:debit,datosaporte:aport });
            }, time);
          }, time);
        }, time);
      }, time);
    }else{
      console.log("entro al else")
      res.render('eliminarAporte', { user : req.user });}


});
router.post('/eliminarAporteRedir', function(req, res) {
  res.redirect('/eliminarAporte?nombre_programa='+req.body.nombre_programaRedir+'&dni='+req.body.dniRedir);

});

router.post('/eliminarAporte', function(req, res) {
  var aporte = new Aporta(req.body.dni,req.body.nombre_programa);
  aporte.cargar()
  setTimeout(function(){
    aporte.eliminar()
    setTimeout(function(){
      res.redirect('/')
    }, time);
  }, time);



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
            if(!err && !result.rows[0]){
              res.render('donantesPorPrograma', { user : req.user, listaprogramas:prog.lista });
            }
            if(result.rows[0]){
              tagExport="DonantesPPrograma "+nombre_programa+" "+toStringForExportTag(new Date())
              res.render('donantesPorPrograma', { user : req.user,lista:result.rows, listaprogramas:prog.lista, tagExport:tagExport  });
            }
            client.end(function (err) {
              if (err) {console.log(err)};
            });
          });
        });
      }else{
        res.render('donantesPorPrograma', { user : req.user, listaprogramas:prog.lista });
      }
    }, time);
});

router.post('/donantesPorProgramaRedir', function(req, res) {
  res.redirect('/donantesPorPrograma?nombre_programa='+req.body.nombre_programaRedir);

});
//-----------------------------------------------------------------------------------------------------------------------
router.get('/infoDonante', function(req, res) {
    var dni=req.query.dni;
    var donant = new Donante(dni);
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
            if(!err && !result.rows[0]){
              res.render('infoDonante', { user : req.user});
            }
            if(result.rows[0]){
                console.log("INFODONANTE ES  "+result.rows[0].ocupacion+" y "+result.rows[0].cuil_cuit);
                if(result.rows[0].fecha_nac){
                  result.rows[0].fecha_nac = result.rows[0].fecha_nac.toLocaleDateString();}
                res.render('infoDonante', { user : req.user,infoDonante:result.rows, listaAportes:donant.listaAportes, datosdonante:donant  });
            }
            client.end(function (err) {
              if (err) {console.log(err)};
            });
          });
        });
      }else{
        res.render('infoDonante', { user : req.user});
      }
    },500);


});

router.post('/infoDonanteRedir', function(req, res) {
    res.redirect('/infoDonante?dni='+req.body.dniRedir);
});

//---------------------------------------------------------
router.get('/infoContacto', function(req, res) {
    var dni=req.query.dni;
      if(dni){
        client = new pg.Client(connectionString);
        client.connect(function (err) {
          if (err){console.log(err);}
          var query = "select * from (select * from ciudad_de_los_niños_development.contacto where dni='"+dni+"') don natural join (select * from ciudad_de_los_niños_development.padrino) padr natural join (select * from ciudad_de_los_niños_development.persona) per";
          console.log(query);
          client.query(query, function (err, result) {
            if (err) throw err;
            if(!err && !result.rows[0]){
              res.render('infoContacto', { user : req.user});
            }
            if(result.rows[0]){
                console.log("INFOCONTACTO  "+result.rows[0]);
                if(result.rows[0].fecha_nac)result.rows[0].fecha_nac = result.rows[0].fecha_nac.toLocaleDateString();
                if(result.rows[0].fecha_primer_contacto){result.rows[0].fecha_primer_contacto = result.rows[0].fecha_primer_contacto.toLocaleDateString();}
                if(result.rows[0].fecha_alta){result.rows[0].fecha_alta = result.rows[0].fecha_alta.toLocaleDateString();}
                if(result.rows[0].fecha_baja){result.rows[0].fecha_baja = result.rows[0].fecha_baja.toLocaleDateString();}
                if(result.rows[0].fecha_rechazo_adhesion){result.rows[0].fecha_rechazo_adhesion = result.rows[0].fecha_rechazo_adhesion.toLocaleDateString();}

                res.render('infoContacto', { user : req.user,infoContacto:result.rows});
            }
            client.end(function (err) {
              if (err) {console.log(err)};
            });
          });
        });
      }else{
        res.render('infoContacto', { user : req.user});
      }

});

router.post('/infoContactoRedir', function(req, res) {
    res.redirect('/infoContacto?dni='+req.body.dniRedir);
});


router.get('/donantesPorBanco', function(req, res) {
    var nombre_banco=req.query.nombre_banco
    var banco = new Debito();
    var nofiltro = req.query.nofiltro
    banco.listaBancos()
    setTimeout(function(){
      if(nombre_banco){
        client = new pg.Client(connectionString);

        client.connect(function (err) {
          if (err){console.log(err);}
          console.log("LO SIGUIENTE ES EL FILTROFECA")
          var query
          if(nofiltro=="true"){
            query="select * from (select * from ciudad_de_los_niños_development.aporta ) ap natural join (select * from ciudad_de_los_niños_development.debito where nombre_banco = '"+nombre_banco+"') deb"
            console.log("no aplica el filtro")
          }else{
            query="select * from (select * from ciudad_de_los_niños_development.aporta where ((not(frecuencia='Semestral') OR MOD((extract(YEAR FROM age(fecha_aporte,now()))*12 + extract(MONTH FROM age (fecha_aporte,now() )))::integer,6)=0)and fecha_aporte <=now()::date )) ap natural join (select * from ciudad_de_los_niños_development.debito where nombre_banco = '"+nombre_banco+"') deb"

          }
          console.log(nofiltro)

         //	var query = "﻿select * from (select * from (select * from ciudad_de_los_niños_development.aporta) ap natural join (select * from ciudad_de_los_niños_development.debito where nombre_banco = '"+nombre_banco+"') deb) apdeb natural join (select * from ciudad_de_los_niños_development.persona) per"
          console.log(query);
          client.query(query, function (err, result) {
            if (err) throw err;
            if(!err && !result.rows[0]){
              res.render('donantesPorBanco', { user : req.user, listabancos:banco.lista });
            }
            if(result.rows[0]){
              tagExport="DonantesPBanco "+nombre_banco+" "+toStringForExportTag(new Date())
              res.render('donantesPorBanco', { user : req.user,lista:result.rows, listabancos:banco.lista,tagExport:tagExport  });
            }
            client.end(function (err) {
              if (err) {console.log(err)};
            });
          });
        });
      }else{

        res.render('donantesPorBanco', { user : req.user, listabancos:banco.lista });
      }
    }, time);


});

router.post('/donantesPorBancoRedir', function(req, res) {
  res.redirect('/donantesPorBanco?nombre_banco='+req.body.nombre_bancoRedir+'&nofiltro='+req.body.filtrofecha);

});
////-----------$$$$$$$$$$
router.get('/listadoDonantes', function(req, res) {
  client = new pg.Client(connectionString);

  client.connect(function (err) {
    if (err){console.log(err);}
    console.log(query);

  //  var query = "select * from ciudad_de_los_niños_development.donante  natural join ciudad_de_los_niños_development.persona WHERE existe = TRUE "
    var query = "select * from (select * from ciudad_de_los_niños_development.donante  natural join ciudad_de_los_niños_development.persona WHERE existe = TRUE )as a natural join ciudad_de_los_niños_development.padrino"
    client.query(query, function (err, result) {
      if (err) throw err;
      if(!err && !result.rows[0]){
          res.render('listadoDonantes', { user : req.user});
      }
      if(result.rows[0]){
        tagExport="Donantes "+toStringForExportTag(new Date())

        res.render('listadoDonantes', { user : req.user,lista:result.rows,tagExport:tagExport});
      }
      client.end(function (err) {
        if (err) {console.log(err)};
      });
    });
  });

});

router.get('/listadoAportes', function(req, res) {
  client = new pg.Client(connectionString);

  client.connect(function (err) {
    if (err){console.log(err);}
    var query = "select * from (select * from ciudad_de_los_niños_development.aporta  natural join ciudad_de_los_niños_development.persona  )as a natural join ciudad_de_los_niños_development.tarjeta"
    var query2 = "select * from (select * from ciudad_de_los_niños_development.aporta  natural join ciudad_de_los_niños_development.persona  )as a natural join ciudad_de_los_niños_development.debito"
    var tagExport;
    client.query(query, function (err, result) {
      if (err) throw err;
      var listacred;
      if(result.rows[0]){
        tagExport="Aportes "+toStringForExportTag(new Date())
        listacred=result.rows;
      }
        client.query(query2, function (err, result) {
          var listadeb;
          if (err) throw err;
          if(result.rows[0]){
            tagExport="Aportes "+toStringForExportTag(new Date())
            listadeb=result.rows;

          }

          res.render('listadoAportes', { user : req.user,listadeb:listadeb,listacred:listacred,tagExport:tagExport});
          client.end(function (err) {
            if (err) {console.log(err)};
          });
        });


      client.end(function (err) {
        if (err) {console.log(err)};
      });
    });
  });

});
router.get('/listadoGraficoAportes', function(req, res) {
  client = new pg.Client(connectionString);
  var lista ;
  var lista2;
  client.connect(function (err) {
    if (err){console.log(err);}
    var query = "select nombre_programa as label,count(dni) as data from ciudad_de_los_niños_development.aporta group by nombre_programa"
    console.log(query);

    client.query(query, function (err, result) {
      if (err) throw err;

      if(!err){
        console.log(result.rows);
        query ="select estado as label,count(dni) as data from ciudad_de_los_niños_development.contacto group by estado"
        lista = result.rows;
        client.query(query, function (err, result) {
          if (err) throw err;
          if(!err){
            console.log(result.rows);
            lista2 = result.rows;
            res.render('listadoGraficoAportes', { user : req.user,lista:lista,lista2:lista2});

            client.end(function (err) {
              if (err) {console.log(err)};
            });


          }

      })
    };
    });
  });

});
router.get('/prueba', function(req, res) {
        res.render('prueba', { user : req.user});
  });


router.get('/listadoContactos', function(req, res) {
  client = new pg.Client(connectionString);

  client.connect(function (err) {
    if (err){console.log(err);}
    var query = "select * from (select * from ciudad_de_los_niños_development.contacto natural join ciudad_de_los_niños_development.persona  )as a natural join ciudad_de_los_niños_development.padrino"
    console.log(query);

    client.query(query, function (err, result) {
      if (err) throw err;
      if(!err && !result.rows[0]){
        res.render('listadoContactos', { user : req.user});
      }
      if(result.rows[0]){
        tagExport="Contactos "+toStringForExportTag(new Date())

        res.render('listadoContactos', { user : req.user, lista:result.rows,tagExport:tagExport});
      }
      //if (!err) {  res.render('listadoContactos', { user : req.user});};
      client.end(function (err) {
        if (err) {console.log(err)};
      });
    });
  });

});

//---------------------------------------------------------------------------------------------------------------------
  router.get('/listadoProgramas', function(req, res) {
    client = new pg.Client(connectionString);
    client.connect(function (err) {
     if (err){console.log(err);}
     var query = "select nombre_programa,descripcion from ciudad_de_los_niños_development.programa "
     console.log(query);
     client.query(query, function (err, result) {
       if (err) throw err;
       if(!err && !result.rows[0]){
           res.render('listadoProgramas', { user : req.user});
       }
       if(result.rows[0]){
          tagExport="Programas "+toStringForExportTag(new Date())
          res.render('listadoProgramas', { user : req.user,lista:result.rows,tagExport:tagExport});
        }
       client.end(function (err) {
         if (err) {console.log(err)};
       });
     });
   });
  });


  router.get('/donantesPorTarjeta', function(req, res) {
      var nombre_tarjeta=req.query.nombre_tarjeta
      var nofiltro = req.query.nofiltro
      var tarjeta = new Credito();
      var usuario = req.user
      tarjeta.tiposTarjeta()
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      console.log(req.user)


      setTimeout(function(){
        if(nombre_tarjeta){
          client = new pg.Client(connectionString);

          client.connect(function (err) {
            if (err){console.log(err);}
            var query
            console.log(req.user)
            if(nofiltro=="true"){
              query="select * from (select * from ciudad_de_los_niños_development.aporta) ap natural join (select * from ciudad_de_los_niños_development.tarjeta where nombre_tarjeta = '"+nombre_tarjeta+"') deb"
              console.log("no aplica el filtro")
            }else{
              query="select * from (select * from ciudad_de_los_niños_development.aporta where ((not(frecuencia='Semestral') OR MOD((extract(YEAR FROM age(fecha_aporte,now()))*12 + extract(MONTH FROM age (fecha_aporte,now() )))::integer,6)=0)and fecha_aporte <=now()::date )) ap natural join (select * from ciudad_de_los_niños_development.tarjeta where nombre_tarjeta = '"+nombre_tarjeta+"') deb"

            }

           //	var query = "﻿select * from (select * from (select * from ciudad_de_los_niños_development.aporta) ap natural join (select * from ciudad_de_los_niños_development.debito where nombre_banco = '"+nombre_banco+"') deb) apdeb natural join (select * from ciudad_de_los_niños_development.persona) per"
            console.log(query);
            client.query(query, function (err, result) {
              if (err) throw err;
              if(!err && !result.rows[0]){res.render('donantesPorTarjeta', { user: req.user, listatarjetas:tarjeta.listatarjetas});}
              if(result.rows[0]){

                tagExport="DonantesPTarjeta "+nombre_tarjeta+" "+toStringForExportTag(new Date())
                res.render('donantesPorTarjeta', { user: req.user, listatarjetas:tarjeta.listatarjetas ,lista:result.rows,tagExport:tagExport });
              }else{
                res.render('donantesPorTarjeta', { user: req.user, listatarjetas:tarjeta.listatarjetas})
              }
              client.end(function (err) {
                if (err) {console.log(err)};
              });
            });
          });
        }else{
        //  res.render('donantesPorTarjeta', {user:req.user, });
          res.render('donantesPorTarjeta', { user : usuario,listatarjetas:tarjeta.listatarjetas });
        }
      }, time);


  });

  router.post('/donantesPorTarjetaRedir', function(req, res) {
    res.redirect('/donantesPorTarjeta?nombre_tarjeta='+req.body.nombre_tarjetaRedir+'&nofiltro='+req.body.nofiltro);

  });

  router.get('/adherirContacto', function(req, res) {
      var dni=req.query.dni;
        if(dni){
          var contact = new Contacto(dni);
          contact.cargar();
          //setTimeout(function(){}, time);

          setTimeout(function(){
            contact.estado="Adherido";
            contact.actualizar();
            setTimeout(function(){
              var donant = new Donante(dni);
              donant.origen = contact.relacion;
              donant.insertar();
              setTimeout(function(){
                res.redirect('listadoDonantes');
              }, time);
            }, time);
          }, time);

        }

  });

  router.get('/historialDonante', function(req, res) {
      var dni=req.query.dni;
      var nombre_programa=req.query.nombre_programa;
      var id=req.query.id;
      var query ;
      var programaespecifico;
      if(nombre_programa==undefined || id == undefined){
        query = "select * from ciudad_de_los_niños_development.cobro where dni='"+dni+"'";
      }else{
        query = "select * from ciudad_de_los_niños_development.cobro where dni='"+dni+"' and nombre_programa='"+nombre_programa+"' and id="+id;
        programaespecifico=nombre_programa;

      }

      setTimeout(function(){
        if(dni){
          client = new pg.Client(connectionString);
          client.connect(function (err) {
            if (err){console.log(err);}
            console.log(query);
            client.query(query, function (err, result) {
              if (err) throw err;

              if(!err){
                  console.log("renderiza");
                  setTimeout(function(){
                    res.render('historialDonante', { user : req.user,dni:dni, lista:result.rows,prog:programaespecifico });
                  },time);
              }
              client.end(function (err) {
                if (err) {console.log(err)};
              });
            });
          });
        }else{
          res.render('infoDonante', { user : req.user});
        }
      },time);


  });





router.get('/listadoCobros', function(req, res) {
  client = new pg.Client(connectionString);

  client.connect(function (err) {
    if (err){console.log(err);}
    var query = "select * from ciudad_de_los_niños_development.cobro"

    client.query(query, function (err, result) {
      if (err) throw err;

      if(!err){


          res.render('listadoCobros', { user : req.user,lista:result.rows});
        }
      client.end(function (err) {
        if (err) {console.log(err)};

    });
  });

});
});


router.get('/insertarCobros', function(req, res) {
      res.render('insertarCobros', { user : req.user});
});


router.post('/insertarCobros', function(req, res) {
  client = new pg.Client(connectionString);
  client.connect(function(err) {
      if (err) {
          console.log(err);
      }
      //console.log("SELECT * FROM creacCobros("+req.body.")");
      client.query("SELECT * FROM ciudad_de_los_niños_development.crearCobros("+req.body.mes+","+req.body.año+")", function(err, result) {
          if (err) throw err;
          if (!err) {
            res.redirect('/listadoCobros');
          }

          client.end(function(err) {
              if (err) {
                  console.log(err)
              };
          });
      });
  });
//setTimeout(function(){}, time);
});
router.get('/modificarCobro', function(req, res) {
  var dni = req.query.dni;
  var nombre_programa = req.query.nombre_programa;
  var id = req.query.id;
  var fecha = req.query.fecha;
  if (dni && nombre_programa && id && fecha) {
    var cobro = new Cobro(dni, nombre_programa, id, null, fecha);
    cobro.cargar();
    setTimeout(function() {
      res.render('modificarCobro', {
        user: req.user,
        datoscobro: cobro
      });
    }, time);
  } else {
    res.render('modificarCobro', {
      user: req.user
    });
  }
});


router.post('/modificarCobro', function(req, res) {
  var dni =req.body.dni;
  var nombre_programa=req.body.nombre_programa;
  var id=req.body.id;
  var fecha="01/"+req.body.mes+"/"+req.body.año;

  var cobro = new Cobro(dni,nombre_programa,id,null,fecha);

  cobro.cargar()


  setTimeout(function(){
    cobro.fecha=fecha;
    console.log(cobro)
    cobro.comentario=req.body.comentario;
    cobro.monto=req.body.monto;
    cobro.estado = req.body.estado;
    console.log("EL ESTADO COBRO ES:"+req.body.estado)

    cobro.actualizar()

    setTimeout(function(){
      //res.redirect('/modificarCobro?nombre_programa='+req.body.nombre_programa+'&dni='+req.body.dni);
      res.redirect('/listadoCobros');
    }, time);
  }, time);


});


router.get('/eliminarCobro', function(req, res) {
  var dni = req.query.dni;
  var nombre_programa = req.query.nombre_programa;
  var id = req.query.id;
  var fecha = req.query.fecha;
  if (dni && nombre_programa && id && fecha) {
    var cobro = new Cobro(dni, nombre_programa, id, null, fecha);
    cobro.cargar();
    setTimeout(function() {
      res.render('eliminarCobro', {
        user: req.user,
        datoscobro: cobro
      });
    }, time);
  } else {
    res.render('eliminarCobro', {
      user: req.user
    });
  }
});


router.post('/eliminarCobro', function(req, res) {
  var cobro = new Cobro(req.body.dni,req.body.nombre_programa,req.body.id,null,"01/"+req.body.mes+"/"+req.body.año);
  setTimeout(function(){
    cobro.eliminar()
    setTimeout(function(){
      res.redirect('/listadoCobros')
    }, time);
  }, time);



});



  function toStringForExportTag(a) {
      return a.getDate()+"-"+(parseInt(a.getMonth()) + 1 )+"-"+a.getFullYear()
  };



module.exports = router;
