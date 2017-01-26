var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var results = [];

var client = new pg.Client(connectionString);


var persona_model = require("./models/persona");
var Persona = persona_model.persona;

var programa_model = require("./models/programa");
var Programa = programa_model.programa;

var debito_model = require("./models/debito");
var Debito = debito_model.debito;

//
// // connect to our database
// client.connect(function (err) {
//   if (err) throw err;
//
//   // execute a query on our database
//   client.query("SELECT * FROM ciudad_de_los_niños_development.contacto where dni='32456915'", function (err, result) {
//     if (err) throw err;
//       console.log(result.rows[0].fecha_alta.toLocaleDateString());
//     // just print the result to the console
//    //var i=0;
//    // while (i<result.rowCount){
//     	//console.log(result.rows[i].dni+'||'+result.rows[i].n_y_ap); // outputs: { name: 'brianc' }
// 		//i++;
// 	//}
//     // disconnect the client
//     client.end(function (err) {
//       if (err) throw err;
//     });
//   });
// });
// //
//

//---------------------------------------------------------------------------------------------------------------------
//                                          PRUEBA DE PROGRAMA
//var programaprueba = new Programa("asado");
//console.log(programaprueba);
//programaprueba.cargar();
// setTimeout(function(){console.log(programaprueba.show()); }, 15);

//  var programaprueba2 = new Programa("fobal socker gogogo");
//  programaprueba2.descripcion="jugar al fobal pateando el esferico";
 //console.log(programaprueba2)
// programaprueba2.insertar();
//programaprueba2.cargar();
//setTimeout(function(){programaprueba2.actualizar("fobal socker gogogo");} , 1500);
//programaprueba2.eliminar();
//programaprueba2.exist();
//setTimeout(function(){if (programaprueba2.existe){console.log("existe el programa");} }, 1500);

//                            -----            PRUEBA DE DEBITO         -----
 var debitoprueba = new Debito(1);
// console.log(debitoprueba);
// debitoprueba.cargar();
// setTimeout(function(){console.log(debitoprueba.show()); }, 1500);

var debitoprueba2 = new Debito(2);
// debitoprueba2.numero_cuenta=345;
// debitoprueba2.cbu="3455786845";
// debitoprueba2.titular="cangre burger";
// debitoprueba2.codigo=342;
// debitoprueba2.cuenta="debe todo";
// debitoprueba2.banco="frances";
// debitoprueba2.sucursal="chucuy";
//  console.log(debitoprueba2)
//  debitoprueba2.insertar();

 // debitoprueba2.cargar();
 // setTimeout(function(){console.log(debitoprueba2.show()); }, 1500);

 // debitoprueba2.numero_cuenta=6789;
 // debitoprueba2.cbu="12345";
 // debitoprueba2.titular="victor corleone";
 // debitoprueba2.codigo=678;
 // debitoprueba2.cuenta=" todo al dia";
 // debitoprueba2.banco="hipotecario";
 // debitoprueba2.sucursal="ucrania";
 // debitoprueba2.actualizar();
 //
 // setTimeout(function(){console.log(debitoprueba2.show()); }, 1500);

//debitoprueba.eliminar();
debitoprueba2.exist();
setTimeout(function(){if (debitoprueba2.existe){console.log(" existe el debito");} }, 2500);



//------------------------------------------------------------------------------------------------------------------

// console.log(personaprueba.show());
//
// console.log("APLICAMOS EL METODO CARGA:"+ personaprueba.dni);
//
// personaprueba.cargar();
//personaprueba.exist();
//setTimeout(function(){if (personaprueba.existe){console.log("existe la persona");} }, 1500);



// console.log(personaprueba.existe())
//
// setTimeout(function(){console.log(personaprueba.show()); }, 15);
  //
 //  var personaprueba2 = new Persona("999");
 //  personaprueba2.n_y_ap="JOSE"
 //  console.log(personaprueba2)
 // personaprueba2.insertar();
  //
  //
    // var personaprueba2 = new Persona("39420475");
    // personaprueba2.n_y_ap="valinto"
    // console.log(personaprueba2)
    // personaprueba2.actualizar();

  // ]

//
// console.log("modificamos el nombre de la persona y volvemos a cargar el nombre desde la base")
// personaprueba.cargar();
// console.log(personaprueba.show());


//console.log("supuestamente hizo la conexion");
//var queryloca=client.query("SELECT * FROM ciudad_de_los_niños_development.persona");
//console.log(queryloca);
