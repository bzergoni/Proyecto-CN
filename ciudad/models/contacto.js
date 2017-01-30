var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Contacto(doc,fech_p_cont,fech_alt,fech_baj,fech_rech_adh,estad,dni_recom,coment,relac){
  this.dni = doc;
  this.fecha_primer_contacto = fecha_p_cont;
  this.fecha_alta = fech_alt;
  this.fecha_baja = fech_baj;
  this.fecha_rechazo_adhesion = fech_rech_adh;
  this.estado = estad;
  this.dni_recomendador = dni_recom;
  this.comentario = coment;
  this.relacion = relac;
  this.existe=undefined;
};


Contacto.prototype.show = function(){
  return this.dni + " | recomendado por: " + this.dni_recomendador+ " | " + this.comentario;
};


Contacto.prototype.cargar = function(){

  var dni=this.dni;
  var thisrespaldo=this;
  client.connect(function (err) {
    if (err){console.log(err);}
    // execute a query on our database
    console.log("comienza la carga de "+dni);
    console.log("SELECT * FROM ciudad_de_los_niños_development.contacto where dni='dni'");
  //  console.log(thisrespaldo)
    client.query("SELECT * FROM ciudad_de_los_niños_development.contacto where dni='"+dni+"'", function (err, result) {
      if (err) throw err;
      if(result.rows[0]){
        //repetirse para todos los campos

        thisrespaldo.dni = result.rows[0].dni;
        thisrespaldo.fecha_primer_contacto = result.rows[0].fecha_primer_contacto.toLocaleDateString();
        thisrespaldo.fecha_alta = result.rows[0].fecha_alta.toLocaleDateString();
        thisrespaldo.fecha_baja = result.rows[0].fecha_baja.toLocaleDateString();
        thisrespaldo.fecha_rechazo_adhesion = result.rows[0].fecha_rechazo_adhesion.toLocaleDateString();
        thisrespaldo.estado = result.rows[0].estado;
        thisrespaldo.dni_recomendador = result.rows[0].dni_recomendador;
        thisrespaldo.comentario = result.rows[0].comentario;
        thisrespaldo.relacion = result.rows[0].relacion;
      }
      client.end(function (err) {
        if (err) {console.log(err)};
      });
    });
  });
};
///Esta funcion se supone que inserte o actualize la tabla
Contacto.prototype.insertar = function(){
  var thisrespaldo=this
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("insert into ciudad_de_los_niños_development.contacto values ('"+thisrespaldo.dni+"','"+thisrespaldo.fecha_primer_contacto+"','"+thisrespaldo.fecha_alta+"','"+thisrespaldo.fecha_baja+"','"+thisrespaldo.fecha_rechazo_adhesion+"','"+thisrespaldo.estado+"','"+thisrespaldo.dni_recomendador+"','"+thisrespaldo.comentario+"','"+thisrespaldo.relacion+"');", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });
    });
  });
};

//la funcion actualizar, subiria los cambios luego de una modificacion!
Contacto.prototype.actualizar = function(name){
  var dni=this.dni;
  var fecha_primer_contacto=this.fecha_primer_contacto;
  var fecha_alta=this.fecha_alta;
  var fecha_baja=this.fecha_baja
  var fecha_rechazo_adhesion=this.fecha_rechazo_adhesion
  var estado=this.estado
  var dni_recomendador=this.dni_recomendador
  var comentario =this.comentario
  var relacion=this.relacion



  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("update ciudad_de_los_niños_development.contacto set fecha_primer_contacto='"+fecha_primer_contacto+"',fecha_alta='"+fecha_alta+",fecha_baja='"+fecha_baja+"',fecha_rechazo_adhesion='"+fecha_rechazo_adhesion+"',estado='"+estado+"',dni_recomendador='"+dni_recomendador+"',comentario='"+comentario+"',relacion='"+relacion+"'' where dni='" + dni + "'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });
    });
  });
};

Contacto.prototype.eliminar= function(){
  var dni=this.dni;
  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    client.query("delete from ciudad_de_los_niños_development.contacto  where dni='"+dni+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });


    });
  });
};


Contacto.prototype.exist = function(){
  var dni=this.dni;
  var thisrespaldo=this;

  client.connect(function (err) {
    if (err){console.log(err);}
    client.query("SELECT * FROM ciudad_de_los_niños_development.contacto where dni='"+dni+"'", function (err, result) {
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


module.exports.contacto = Contacto;