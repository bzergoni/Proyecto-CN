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

//----------------------------PRUEBA MEDIO DE PAGO--------------------------------------------

var mpp = new MedioPago(5);

//console.log(mpp.show());

//mpp.insertar();
//mpp.eliminar();
//setTimeout(function(){if (mpp.exist()){console.log(" existe el medio de pago");} }, 2500);
//setTimeout(function(){mpp.insertar();}, 2500);


//-----------------------------PRUEBA CREDITO-----------------------------------------

var creditoprueba = new Credito('123','cordobesa','bruno','11/11/2017','3213');
//var creditoprueba = new Credito('12333','BBVA','Bruno','22/11/2017','3213');

//creditoprueba.cargar();
//creditoprueba.insertar();
//console.log("antes de la actualiacion");
//creditoprueba.actualizar();


//----------------------------PRUEBA APORTA-----------------------------------

var aport = new Aporta('17589342','asado', 80, 'Semestral', 3);

// //var pers = new Persona('123123');
// //pers.n_y_ap = 'hola';
// //pers.eliminar();
// //aport.cargar();

//aport.insertar();
//aport.eliminar();

// //console.log(aport);
//aport.exist();
setTimeout(function(){  if (aport.existe){console.log(" existe el aporte");} }, 1500);
// //creditoprueba.actualizar();
// //creditoprueba.eliminar();
// //console.log(creditoprueba.show());
// //
// //var personaprueba = new Persona("1122333");
// //console.log(medioPagoprueba);
// //aport.cargar();
// // console.log(personaprueba.show());
// //setTimeout(function(){aport.cargar() }, 1500);
// //console.log("APLICAMOS EL METODO CARGA:"+ mpp.id);

// //mpp.insertar();
// //personaprueba.exist();
// setTimeout(function(){
//   if (aport.exist()){
//     console.log("existe el aporte");
//     console.log(aport);
//   }
// }, 2500);


// setTimeout(function(){
//   aport.existe = true;

// }, 2500);


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
