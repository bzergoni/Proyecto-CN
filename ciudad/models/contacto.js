var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Contacto(doc,fech_p_cont,fech_rech_adh,estad,dni_recom,coment,relac,fech_ult_contac){
  this.dni = doc;
  this.fecha_primer_contacto = fech_p_cont;

  this.fecha_rechazo_adhesion = fech_rech_adh;
  this.estado = estad;
  this.dni_recomendador = dni_recom;
  this.comentario = coment;
  this.fecha_ult_contacto = fech_ult_contac;
  this.relacion = relac;
  this.existe=undefined;
};


Contacto.prototype.show = function(){
  return this.dni + " | recomendado por: " + this.dni_recomendador+ " | " + this.comentario;
};


Contacto.prototype.cargar = function(){
  client = new pg.Client(connectionString);
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

        thisrespaldo.fecha_primer_contacto =stringFecha( result.rows[0].fecha_primer_contacto);

        thisrespaldo.fecha_rechazo_adhesion = stringFecha(result.rows[0].fecha_rechazo_adhesion);

        thisrespaldo.fecha_primer_contactoALT =stringFechaALT( result.rows[0].fecha_primer_contacto);

        thisrespaldo.fecha_rechazo_adhesionALT = stringFechaALT(result.rows[0].fecha_rechazo_adhesion);

        thisrespaldo.estado = result.rows[0].estado;
        thisrespaldo.dni_recomendador = result.rows[0].dni_recomendador;
        thisrespaldo.comentario = result.rows[0].comentario;
        thisrespaldo.relacion = result.rows[0].relacion;
        thisrespaldo.existe = true;
        thisrespaldo.fecha_ult_contacto=stringFecha(result.rows[0].fecha_ult_contacto);
        thisrespaldo.fecha_ult_contactoALT=stringFechaALT(result.rows[0].fecha_ult_contacto);
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
    console.log("insert into ciudad_de_los_niños_development.contacto values ('"+thisrespaldo.dni+"',"+fechaToQuery(thisrespaldo.fecha_primer_contacto)+","+fechaToQuery(thisrespaldo.fecha_alta)+","+fechaToQuery(thisrespaldo.fecha_baja)+","+fechaToQuery(thisrespaldo.fecha_rechazo_adhesion)+",'"+thisrespaldo.estado+"','"+thisrespaldo.dni_recomendador+"','"+thisrespaldo.comentario+"','"+thisrespaldo.relacion+"',"+fechaToQuery(thisrespaldo.fecha_ult_contacto)+");");
    client.query("insert into ciudad_de_los_niños_development.contacto values ('"+thisrespaldo.dni+"',"+fechaToQuery(thisrespaldo.fecha_primer_contacto)+","+fechaToQuery(thisrespaldo.fecha_rechazo_adhesion)+",'"+thisrespaldo.estado+"','"+thisrespaldo.dni_recomendador+"','"+thisrespaldo.comentario+"','"+thisrespaldo.relacion+"',"+fechaToQuery(thisrespaldo.fecha_ult_contacto)+");", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });
    });
  });
};

//la funcion actualizar, subiria los cambios luego de una modificacion!
Contacto.prototype.actualizar = function(){
  var dni=this.dni;

  var fecha_primer_contacto;
  if(this.fecha_primer_contacto == undefined){
    fecha_primer_contacto="null";
  }else{
    fecha_primer_contacto="'"+this.fecha_primer_contacto+"'";
  }



  var fecha_rechazo_adhesion;
  if(this.fecha_rechazo_adhesion == undefined){
    fecha_rechazo_adhesion="null";
  }else{
    fecha_rechazo_adhesion="'"+this.fecha_rechazo_adhesion+"'";
  }

  var fecha_ult_contacto;
  if(this.fecha_ult_contacto == undefined){
    fecha_ult_contacto="null";
  }else{
    fecha_ult_contacto="'"+this.fecha_ult_contacto+"'";
  }
  var estado=this.estado;

  var dni_recomendador=this.dni_recomendador;
  var comentario =this.comentario;
  var relacion=this.relacion;

  fecha_ult_contacto=fechaToQuery(this.fecha_ult_contacto);
  fecha_rechazo_adhesion=fechaToQuery(this.fecha_rechazo_adhesion);
  fecha_primer_contacto=fechaToQuery(this.fecha_primer_contacto);


  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};
    // execute a query on our database
    console.log("antes del query");
    client.query("update ciudad_de_los_niños_development.contacto set fecha_primer_contacto="+fecha_primer_contacto+",fecha_rechazo_adhesion="+fecha_rechazo_adhesion+",estado='"+estado+"',dni_recomendador='"+dni_recomendador+"',comentario='"+comentario+"',relacion='"+relacion+"',fecha_ult_contacto="+fecha_ult_contacto+" where dni='" + dni + "'", function (err, result) {
      if (err){console.log(err)}
      console.log("query update");
      console.log("update ciudad_de_los_niños_development.contacto set fecha_primer_contacto="+fecha_primer_contacto+",fecha_rechazo_adhesion="+fecha_rechazo_adhesion+",estado='"+estado+"',dni_recomendador='"+dni_recomendador+"',comentario='"+comentario+"',relacion='"+relacion+"',fecha_ult_contacto="+fecha_ult_contacto+" where dni='" + dni + "'");
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
  client = new pg.Client(connectionString);
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
module.exports.contacto = Contacto;
