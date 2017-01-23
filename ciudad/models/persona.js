var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Persona(number){
  this.dni = number;
  this.n_y_ap;
};

/*
 *  Print a card
 */
Persona.prototype.show = function(){
  return this.dni + " | " + this.n_y_ap;
};


Persona.prototype.cargar = function(){

  var dni=this.dni;
  var thisrespaldo=this;
  client.connect(function (err) {
    if (err){console.log(err);}


    // execute a query on our database
    console.log("comienza la carga de "+dni);
    console.log("SELECT * FROM ciudad_de_los_niños_development.persona where dni='111222333'");
    console.log(thisrespaldo)
    client.query("SELECT * FROM ciudad_de_los_niños_development.persona where dni='"+dni+"'", function (err, result) {
      if (err) throw err;
      if(result.rows[0]){
        //repetirse para todos los campos
        thisrespaldo.n_y_ap=result.rows[0].n_y_ap;
        console.log(thisrespaldo);


      }
    console.log(thisrespaldo)
      client.end(function (err) {
        if (err) {console.log(err)};
      });
    });

  });
};
///Esta funcion se supone que inserte o actualize la tabla
Persona.prototype.insertar = function(){
  var dni=this.dni;
  var n_y_ap=this.n_y_ap;

  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    console.log("insert into ciudad_de_los_niños_development.persona values ('"+dni+"',"+n_y_ap+"');")
    client.query("insert into ciudad_de_los_niños_development.persona values ("+dni+",'"+n_y_ap+"');", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });


    });
  });

};

//la funcion actualizar, subiria los cambios luego de una modificacion!
Persona.prototype.actualizar = function(){
  var dni=this.dni;
  var n_y_ap=this.n_y_ap;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("update ciudad_de_los_niños_development.persona set n_y_ap='"+n_y_ap+"' where dni='"+dni+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });


    });
  });

};
Persona.prototype.eliminar= function(){
  var dni=this.dni;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("delete from ciudad_de_los_niños_development.persona  where dni='"+dni+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });


    });
  });

};

Persona



module.exports.persona = Persona;
