var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var results = [];

var client = new pg.Client(connectionString);


var persona_model = require("./models/persona");
var Persona = persona_model.persona;

var medioPago_model = require("./models/medioPago");
var MedioPago = medioPago_model.medioPago;

var credito_model = require("./models/credito");
var Credito = credito_model.credito;

var aporta_model = require("./models/aporta");
var Aporta = aporta_model.aporta;

var programa_model = require("./models/programa");
var Programa = programa_model.programa;

var programaprueba = new Programa("asado");
//
// // connect to our database
// client.connect(function (err) {debitoprueba2.exist();

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

console.log(MedioPago);
var mpp = new MedioPago(1);

var creditoprueba1 = new Credito('12333','BBVA','cordobesa','22/11/2017','3213');
var creditoprueba = new Credito('12333','BBVA','Bruno','22/11/2017','3213');

//creditoprueba.insertar();
console.log("antes de la actualiacion");
creditoprueba.cargar();

var aport = new Aporta('17589342','asado', 80, 'Semestral', 3);

//var pers = new Persona('123123');
//pers.n_y_ap = 'hola';
//pers.eliminar();
//aport.cargar();
//aport.insertar();
//aport.eliminar();
//console.log(aport);
//setTimeout(function(){if (aport.exist()){console.log(" existe el aporte");} }, 1500);
//creditoprueba.actualizar();
//creditoprueba.eliminar();
//console.log(creditoprueba.show());
//
//var personaprueba = new Persona("1122333");
//console.log(medioPagoprueba);

// console.log(personaprueba.show());
//
//console.log("APLICAMOS EL METODO CARGA:"+ mpp.id);
//
//mpp.insertar();
//personaprueba.exist();
//setTimeout(function(){if (personaprueba.existe){console.log("existe la persona");} }, 1500);



// console.log(personaprueba.existe())
//
// setTimeout(function(){console.log(personaprueba.show()); }, 15);
  //
  // var personaprueba2 = new Persona("999");
  // personaprueba2.n_y_ap="JOSE"
  // console.log(personaprueba2)
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
