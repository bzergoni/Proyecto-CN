var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Donante(doc,ocup,cuit_cuil,coment,fech_alt,fech_baj){
  this.dni = doc;
  this.ocupacion=ocup;
  this.cuil_cuit=cuit_cuil;
  this.existe=false;
  this.existeLogico=undefined;
  this.comentario=coment;
  this.listaProgramasAporta=undefined;
  this.fecha_alta = fech_alt;
  this.fecha_baja = fech_baj;
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
        thisrespaldo.comentario=result.rows[0].comentario;
        thisrespaldo.existe=true;
        thisrespaldo.existeLogico=result.rows[0].existe;
        thisrespaldo.fecha_alta = stringFecha(result.rows[0].fecha_alta);
        thisrespaldo.fecha_baja = stringFecha(result.rows[0].fecha_baja);
        thisrespaldo.fecha_altaALT = stringFechaALT(result.rows[0].fecha_alta);
        thisrespaldo.fecha_bajaALT = stringFechaALT(result.rows[0].fecha_baja);
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
  var comentario=this.comentario;
  var fecha_baja=this.fecha_baja;
  var fecha_alta=this.fecha_alta;


  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database

    var query= "insert into ciudad_de_los_niños_development.donante(dni,ocupacion,cuil_cuit,comentario,fecha_alta,fecha_baja) values ('"+dni+"','"+ocupacion+"','"+cuil_cuit+"','"+comentario+"',"+fechaToQuery(fecha_alta)+","+fechaToQuery(fecha_baja)+");";
    console.log(fecha_alta);
    console.log(fecha_baja)
    console.log(query)

    client.query(query, function (err, result) {
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
  var comentario=this.comentario;
  var fecha_alta
  if(this.fecha_alta == undefined){
    fecha_alta="null";
  }else{
    fecha_alta="'"+this.fecha_alta+"'";
  }

  var fecha_baja
  if(this.fecha_baja == undefined){
    fecha_baja="null";
  }else{
    fecha_baja="'"+this.fecha_baja+"'";
  }
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("update ciudad_de_los_niños_development.donante set ocupacion='"+ocupacion+"',cuil_cuit='"+cuil_cuit+"',comentario='"+comentario+"',fecha_baja="+fecha_baja+",fecha_alta="+fecha_alta+" where dni='"+dni+"'", function (err, result) {
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
//--------------------------------------------------------------------------------------------------------
Donante.prototype.programasQueAporta = function(){
  client = new pg.Client(connectionString);
  var dni=this.dni;
    console.log("el dni de los programas es "+dni);
  var thisrespaldo=this;
  client.connect(function (err) {
    if (err){console.log(err);}
    console.log("select nombre_programa from ciudad_de_los_niños_development.aporta where dni='"+dni+"')");
    client.query("select * from ciudad_de_los_niños_development.aporta where dni='"+dni+"'", function (err, result) {
      if (err) throw err;
      if(result.rows[0]){
        thisrespaldo.listaAportes=result.rows;
      }
      client.end(function (err) {
        if (err) {console.log(err)};
      });
    });
  });
};

function stringFecha(a){
  if(a){
    return a.toLocaleDateString();
  }else{
    return a
  }
}
function stringFechaALT(a) {
  if(a){
    var mm = a.getMonth() + 1;
    var dd = a.getDate();

    return [a.getFullYear(),
      (mm>9 ? '' : '0') + mm,
      (dd>9 ? '' : '0') + dd
    ].join('-');
  }else{return null;}
};




function fechaToQuery(a){
  if(a == ""||a == undefined){
    return ("null");
  }else{
    return ("'"+a+"'");
  }
}
module.exports.donante = Donante;
