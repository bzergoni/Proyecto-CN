var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Credito(number, tipo_tarj, nom_titular, fecha_venc, cod_verif){
  this.id = undefined;
  this.nro = number;
  this.nombre_tarjeta = tipo_tarj;
  this.nombre_titular = nom_titular;
  this.fecha_vencimiento = fecha_venc;
  this.codigo_verificacion = cod_verif;
  this.existe=undefined;
};

Credito.prototype.show = function(){
  return this.id +" | "+this.nro + " | " + this.nombre_tarjeta+ " | " + this.nombre_titular+ " | " + this.fecha_vencimiento+ " | " + this.codigo_verificacion;
};


Credito.prototype.cargar = function(){
  var nro = this.nro;
  var nombre_tarjeta=this.nombre_tarjeta;
  var thisrespaldo = this;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err){console.log(err);}
    client.query("SELECT * FROM ciudad_de_los_niños_development.tarjeta where nro='"+nro+"' and nombre_tarjeta='"+nombre_tarjeta+"'", function (err, result) {
      if (err) throw err;
      if(result.rows[0]){
        //repetirse para todos los campos
        thisrespaldo.id=result.rows[0].id;
        thisrespaldo.nro=result.rows[0].nro;
        thisrespaldo.nombre_tarjeta=result.rows[0].nombre_tarjeta;
        thisrespaldo.nombre_titular=result.rows[0].nombre_titular;
        thisrespaldo.fecha_vencimiento=stringFecha(result.rows[0].fecha_vencimiento);
        thisrespaldo.codigo_verificacion=result.rows[0].codigo_verificacion;
        console.log(thisrespaldo);
        thisrespaldo.existe =true;
      }

    //console.log(thisrespaldo)
    client.end(function (err) {
      if (err) {console.log(err)};
    });
    });

  });
};

Credito.prototype.cargarPorId = function(){
  var thisrespaldo = this;
  client = new pg.Client(connectionString);
  var id = this.id
  client.connect(function (err) {
    if (err){console.log(err);}
    client.query("SELECT * FROM ciudad_de_los_niños_development.tarjeta where id="+id, function (err, result) {
      if (err) throw err;
      if(result.rows[0]){
        //repetirse para todos los campos
        thisrespaldo.id=result.rows[0].id;
        thisrespaldo.nro=result.rows[0].nro;
        thisrespaldo.nombre_tarjeta=result.rows[0].nombre_tarjeta;
        thisrespaldo.nombre_titular=result.rows[0].nombre_titular;
        thisrespaldo.fecha_vencimiento=stringFecha(result.rows[0].fecha_vencimiento);
        thisrespaldo.codigo_verificacion=result.rows[0].codigo_verificacion;
        console.log(thisrespaldo);
        thisrespaldo.existe =true;
      }

    //console.log(thisrespaldo)
    client.end(function (err) {
      if (err) {console.log(err)};
    });
    });

  });
};

///Esta funcion se supone que inserte o actualize la tabla
Credito.prototype.insertar = function(){
  var nro = this.nro;
  var nombre_tarjeta = this.nombre_tarjeta;
  var nombre_titular = this.nombre_titular;
  var fecha_vencimiento = this.fecha_vencimiento;
  var codigo_verificacion = 0 ;//this.codigo_verificacion;

  client = new pg.Client(connectionString);
  /*client.connect(function (err) {
    if (err) {console.log(err)};

    client.query("insert into ciudad_de_los_niños_development.tarjeta values (lastval(),'"+nro+"','"+nombre_titular+"','"+fecha_vencimiento+"','"+nombre_tarjeta+"','"+codigo_verificacion+"');", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });


    });
  });*/
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("insert into ciudad_de_los_niños_development.medio_de_pago values (default);", function (err, result) {
      if (err){console.log(err)}
      if(result){
        console.log("insert into ciudad_de_los_niños_development.tarjeta values (lastval(),'"+nro+"','"+nombre_titular+"',"+fechaToQuery(fecha_vencimiento)+",'"+nombre_tarjeta+"',"+codigo_verificacion+");");
        client.query("insert into ciudad_de_los_niños_development.tarjeta values (lastval(),'"+nro+"','"+nombre_titular+"',"+fechaToQuery(fecha_vencimiento)+",'"+nombre_tarjeta+"',"+codigo_verificacion+");", function (err, result) {
          if (err){console.log(err)}
          if(result){console.log("SE INSERTO EL CREDITO CORRECTAMENTE")}
        });
      }
      client.end(function (err) {
        if (err){ console.log(err)};
      });
    })
});
};

//la funcion actualizar, subiria los cambios luego de una modificacion!
Credito.prototype.actualizar = function(){
  var nro = this.nro;
  var nombre_tarjeta = this.nombre_tarjeta;
  var nombre_titular = this.nombre_titular;
  var fecha_vencimiento = this.fecha_vencimiento;
  //var codigo_verificacion = this.codigo_verificacion;

  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};

    client.query("update ciudad_de_los_niños_development.tarjeta set nombre_titular='"+nombre_titular+"', fecha_vencimiento='"+fecha_vencimiento+"', nombre_tarjeta='"+nombre_tarjeta+"' where nro='"+nro+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });


    });
  });

};
Credito.prototype.eliminar= function(){
  var nro = this.nro;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("delete from ciudad_de_los_niños_development.tarjeta  where nro='"+nro+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });


    });
  });

};


Credito.prototype.exist = function(){
  var nombre_tarjeta=this.nombre_tarjeta;
  var nro = this.nro;
  var thisrespaldo=this;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err){console.log(err);}
    client.query("SELECT * FROM ciudad_de_los_niños_development.tarjeta where nro='"+nro+"'", function (err, result) {
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

Credito.prototype.obtenerId=function(){
  return this.id;
}

Credito.prototype.tiposTarjeta = function(){
  var thisrespaldo=this
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("select * from ciudad_de_los_niños_development.tipotarjeta ", function (err, result) {
      if (err){console.log(err)}
      if(result.rows){
        thisrespaldo.listatarjetas = result.rows
      }

      client.end(function (err) {
        if (err){ console.log(err)};
      });


    });
  });

}



function stringFecha(a){
  if(a){
    return a.toLocaleDateString();
  }else{
    return a
  }
}



function fechaToQuery(a){
  if(a == ""||a == undefined){
    return ("null");
  }else{
    return ("'"+a+"'");
  }
}


module.exports.credito = Credito;
