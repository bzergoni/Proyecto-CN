var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Donante(doc,ocup,cuit_cuil){
  this.dni = doc;
  this.ocupacion=ocup;
  this.cuil_cuit=cuit_cuil;
  this.existe=false;
  this.existeLogico=undefined
};


Donante.prototype.show = function(){
  return this.dni + " | " + this.ocupacion+ " | " + this.cuil_cuit;
};


Donante.prototype.cargar = function(){
  client = new pg.Client(connectionString);
  var dni=this.dni;
  var thisrespaldo=this;
  client.connect(function (err) {
    if (err){console.log(err);}
    // execute a query on our database
    console.log("comienza la carga de "+dni);
    console.log("SELECT * FROM ciudad_de_los_niños_development.donante where dni='dni'");
  //  console.log(thisrespaldo)
    client.query("SELECT * FROM ciudad_de_los_niños_development.donante where dni='"+dni+"'", function (err, result) {
      if (err) throw err;
      if(result.rows[0]){
        //repetirse para todos los campos
        thisrespaldo.ocupacion=result.rows[0].ocupacion;
        thisrespaldo.cuil_cuit=result.rows[0].cuil_cuit;
        thisrespaldo.existe=true;
        thisrespaldo.existeLogico=result.rows[0].existe;
      }
      client.end(function (err) {
        if (err) {console.log(err)};
      });
    });
  });
};
///Esta funcion se supone que inserte o actualize la tabla
Donante.prototype.insertar = function(){
  var dni=this.dni;
  var ocupacion=this.ocupacion;
  var cuil_cuit=this.cuil_cuit;

  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("insert into ciudad_de_los_niños_development.donante values ('"+dni+"','"+ocupacion+"','"+cuil_cuit+"');", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });
    });
  });
};

Donante.prototype.insertarLOGIC = function(){
  var dni=this.dni;

  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("update ciudad_de_los_niños_development.donante set existe=true where dni='"+dni+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });
    });
  });
};


//la funcion actualizar, subiria los cambios luego de una modificacion!
Donante.prototype.actualizar = function(name){
  var dni=this.dni;
  var ocupacion=this.ocupacion;
  var cuil_cuit=this.cuil_cuit;


  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("update ciudad_de_los_niños_development.donante set ocupacion='"+ocupacion+"',cuil_cuit='"+cuil_cuit+"' where dni='"+dni+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });
    });
  });
};

Donante.prototype.eliminar= function(){
  var dni=this.dni;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("update ciudad_de_los_niños_development.donante set existe=false where dni='"+dni+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });


    });
  });
};


Donante.prototype.exist = function(){
  var dni=this.dni;
  var thisrespaldo=this;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err){console.log(err);}
    client.query("SELECT * FROM ciudad_de_los_niños_development.donante where dni='"+dni+"' ", function (err, result) {
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


Donante.prototype.existLOGIC = function(){
  var dni=this.dni;
  var thisrespaldo=this;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err){console.log(err);}
    client.query("SELECT * FROM ciudad_de_los_niños_development.donante where dni='"+dni+"' and existe=true", function (err, result) {
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


module.exports.donante = Donante;
