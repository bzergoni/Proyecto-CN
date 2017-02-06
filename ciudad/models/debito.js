var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Debito(nro,codBanc, nom_titular, cod_ver, t_cuenta, nombre_banco, sucursal_banco){
  this.id=undefined;
  this.numero_cuenta=nro;
  this.cbu=codBanc;
  this.titular=nom_titular;
  this.codigo=cod_ver;
  this.cuenta=t_cuenta;
  this.banco=nombre_banco;
  this.sucursal=sucursal_banco;
  this.existe=undefined;
};


Debito.prototype.show = function(){
  return this.id + " | " + this.numero_cuenta+ " | " + this.cbu+ " | " + this.titular+ " | " + this.codigo+ " | " + this.cuenta+ " | " + this.banco+ " | " + this.sucursal;
};


Debito.prototype.cargar = function(){

  var cbu=this.cbu;
  var thisrespaldo=this;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err){console.log(err);}
    // execute a query on our database

    console.log("SELECT * FROM ciudad_de_los_niños_development.debito where cbu='"+cbu+"'");
  //  console.log(thisrespaldo)
    client.query("SELECT * FROM ciudad_de_los_niños_development.debito where cbu='"+cbu+"'", function (err, result) {
      if (err) throw err;
      if(result.rows[0]){
        //repetirse para todos los campos
        thisrespaldo.id=result.rows[0].id;
        thisrespaldo.numero_cuenta=result.rows[0].nro_cuenta;
        thisrespaldo.cbu=result.rows[0].cbu;
        thisrespaldo.titular=result.rows[0].nombre_titular;
        thisrespaldo.codigo=result.rows[0].codigo_verificacion;
        thisrespaldo.cuenta=result.rows[0].tipo_cuenta;
        thisrespaldo.banco=result.rows[0].nombre_banco;
        thisrespaldo.sucursal=result.rows[0].sucursal_banco;

      }
      client.end(function (err) {
        if (err) {console.log(err)};
      });
    });
  });
};
///Esta funcion se supone que inserte o actualize la tabla
Debito.prototype.insertar = function(){
  var numero_cuenta=this.numero_cuenta;
  var cbu=this.cbu;
  var titular=this.titular;
  var codigo=this.codigo;
  var cuenta=this.cuenta;
  var banco=this.banco;
  var sucursal=this.sucursal;



  client = new pg.Client(connectionString);
  // client.connect(function (err) {
  //   if (err) {console.log(err)};
  //   // execute a query on our database
  //   client.query("insert into ciudad_de_los_niños_development.debito values (lastval(),'"+numero_cuenta+"','"+cbu+"','"+titular+"','"+codigo+"','"+cuenta+"','"+banco+"','"+sucursal+"');", function (err, result) {
  //     if (err){console.log(err)}
  //
  //
  //     client.end(function (err) {
  //       if (err){ console.log(err)};
  //     });
  //   });
  // });

  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("insert into ciudad_de_los_niños_development.medio_de_pago values (default);", function (err, result) {
      if (err){console.log(err)}
      if(result){
        client.query("insert into ciudad_de_los_niños_development.debito values (lastval(),'"+numero_cuenta+"','"+cbu+"','"+titular+"','"+codigo+"','"+cuenta+"','"+banco+"','"+sucursal+"');", function (err, result) {
          if (err){console.log(err)}
          if(result){console.log("SE INSERTO EL DEBITO CORRECTAMENTE")}
        });
      }
      client.end(function (err) {
        if (err){ console.log(err)};
      });
    })
  });

};

//la funcion actualizar, subiria los cambios luego de una modificacion!
Debito.prototype.actualizar = function(){
  var id=this.id;
  var numero_cuenta=this.numero_cuenta;
  var cbu=this.cbu;
  var titular=this.titular;
  var codigo=this.codigo;
  var cuenta=this.cuenta;
  var banco=this.banco;
  var sucursal=this.sucursal;

  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("update ciudad_de_los_niños_development.debito set nro_cuenta='"+numero_cuenta+"',cbu='"+cbu+"',nombre_titular='"+titular+"',codigo_verificacion='"+codigo+"',tipo_cuenta='"+cuenta+"',nombre_banco='"+banco+"',sucursal_banco='"+sucursal+"' where id='"+id+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });
    });
  });
};

Debito.prototype.eliminar= function(){
  var id=this.id;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("delete from ciudad_de_los_niños_development.debito  where id='"+id+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });


    });
  });
};


Debito.prototype.exist = function(){
  var cbu=this.cbu;
  var thisrespaldo=this;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err){console.log(err);}
    client.query("SELECT * FROM ciudad_de_los_niños_development.debito where cbu='"+cbu+"'", function (err, result) {
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

Debito.prototype.obtenerId=function(){
  return this.id;
}

module.exports.debito = Debito;
