var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Programa(name){
  this.nombre = name;
  this.descripcion;
  this.existe=undefined;
};


Programa.prototype.show = function(){
  return this.nombre + " | " + this.descripcion;
};


Programa.prototype.cargar = function(){

  var nombre=this.nombre;
  var thisrespaldo=this;
  client.connect(function (err) {
    if (err){console.log(err);}
    // execute a query on our database
    console.log("comienza la carga de "+nombre);
    console.log("SELECT * FROM ciudad_de_los_niños_development.programa where nombre_programa='asado'");
  //  console.log(thisrespaldo)
    client.query("SELECT * FROM ciudad_de_los_niños_development.programa where nombre_programa='"+nombre+"'", function (err, result) {
      if (err) throw err;
      if(result.rows[0]){
        //repetirse para todos los campos
        thisrespaldo.descripcion=result.rows[0].descripcion;
      }
      client.end(function (err) {
        if (err) {console.log(err)};
      });
    });
  });
};
///Esta funcion se supone que inserte o actualize la tabla
Programa.prototype.insertar = function(){
  var nombre=this.nombre;
  var descripcion=this.descripcion;

  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("insert into ciudad_de_los_niños_development.programa values ('"+nombre+"','"+descripcion+"');", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });
    });
  });
};

//la funcion actualizar, subiria los cambios luego de una modificacion!
Programa.prototype.actualizar = function(name){
  var nombre=this.nombre;
  var descripcion=this.descripcion;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("update ciudad_de_los_niños_development.programa set nombre_programa='"+name+"',descripcion='"+descripcion+"' where nombre_programa='"+nombre+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });
    });
  });
};

Programa.prototype.eliminar= function(){
  var nombre=this.nombre;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("delete from ciudad_de_los_niños_development.programa  where nombre_programa='"+nombre+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });


    });
  });
};


Programa.prototype.exist = function(){
  var nombre=this.nombre;
  var thisrespaldo=this;

  client.connect(function (err) {
    if (err){console.log(err);}
    client.query("SELECT * FROM ciudad_de_los_niños_development.programa where nombre_programa='"+nombre+"'", function (err, result) {
      if (err) throw err;
      if(result.rows[0]){
        thisrespaldo.existe=true;
      }
      client.end(function (err) {
        if (err) {console.log(err)};
      });
    });

  });

};


module.exports.programa = Programa;
