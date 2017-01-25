var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function MedioPago(i){
  this.id = i;
  this.existe = undefined;
};

MedioPago.prototype.show = function(){
  return this.id;
};

///Esta funcion se supone que inserte o actualize la tabla
MedioPago.prototype.insertar = function(){
  var id=this.id;
  
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    
    console.log("insert into ciudad_de_los_niños_development.medio_de_pago values (default);")
    client.query("insert into ciudad_de_los_niños_development.medio_de_pago values (default);", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });


    });
  });

};


MedioPago.prototype.eliminar= function(){
  var id=this.id;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("delete from ciudad_de_los_niños_development.medio_de_pago  where id='"+id+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });


    });
  });

};


MedioPago.prototype.exist = function(){
  var id=this.id;
  var thisrespaldo=this;

  client.connect(function (err) {
    if (err){console.log(err);}
    client.query("SELECT * FROM ciudad_de_los_niños_development.medio_de_pago where id='"+id+"'", function (err, result) {
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


module.exports.medioPago = MedioPago;
