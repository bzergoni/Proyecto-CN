var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var results = [];

var client = new pg.Client(connectionString);


var persona_model = require("./models/persona");
var Persona = persona_model.persona;

var medioPago_model = require("./models/medioPago");
var MedioPago = medioPago_model.medioPago;

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
console.log(MedioPago);
var mpp = new MedioPago(1);
//
//var personaprueba = new Persona("1122333");
//console.log(medioPagoprueba);

// console.log(personaprueba.show());
//
console.log("APLICAMOS EL METODO CARGA:"+ mpp.id);
//
mpp.eliminar();
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
