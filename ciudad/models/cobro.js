var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Cobro(d, np,i, mont,fa, e,com,mont) {
    this.dni = d;
    this.nombre_programa = np;
    this.monto = mont;
    this.comentario = com;
    this.id = i;
    this.fecha = fa;
    this.estado = e;

};

// function Cobro(d, np,i, fa) {
//   this.dni = d;
//   this.nombre_programa = np;
//
//   this.id = i;
//   this.fecha = fa;
//
//
// };




Cobro.prototype.show = function() {
    return this.dni + " | " + this.nombre_programa+ " | " + this.monto + " | " + " | " + this.id;
};

Cobro.prototype.cargar = function() {
    var dni = this.dni;
    var nombre_programa = this.nombre_programa;
    var id = this.id;
    var fecha = this.fecha;
    var thisrespaldo = this;
    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err);
        }
        console.log("SELECT * FROM ciudad_de_los_niños_development.cobro where dni='" + dni + "' and nombre_programa='"+nombre_programa+"' and fecha='"+fecha+"' and id="+id);
        client.query("SELECT * FROM ciudad_de_los_niños_development.cobro where dni='" + dni + "' and nombre_programa='"+nombre_programa+"' and fecha='"+fecha+"' and id="+id, function(err, result) {
            if (err) throw err;
            if (result.rows[0]) {

                thisrespaldo.monto = result.rows[0].monto;
                thisrespaldo.comentario = result.rows[0].comentario;
                thisrespaldo.estado = result.rows[0].estado;
                thisrespaldo.fecha=result.rows[0].fecha;
                console.log(thisrespaldo);

            }
            console.log(thisrespaldo)
            client.end(function(err) {
                if (err) {
                    console.log(err)
                };
            });
        });
    });
};
///Esta funcion se supone que inserte o actualize la tabla
Cobro.prototype.insertar = function() {
    var dni = this.dni;
    var nombre_programa = this.nombre_programa;
    var id = this.id;
    var fecha = this.fecha;
    var monto = this.monto;
    var comentario = this.comentario;
    var estado = this.estado;

    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };
        console.log("insert into ciudad_de_los_niños_development.cobro values ('" + dni + "','" + nombre_programa + "'," + id + ",'" +fecha+ "','"+ estado + "','" + comentario +"',"+monto+");");
        client.query("insert into ciudad_de_los_niños_development.cobro values ('" + dni + "','" + nombre_programa + "'," + id + ",'" +fecha+ "','"+ estado + "','" + comentario +"',"+monto+");", function(err, result) {
            if (err) {
                console.log(err)
            }
            client.end(function(err) {
                if (err) {
                    console.log(err)
                };
            });
        });
    });
};

//la funcion actualizar, subiria los cambios luego de una modificacion!
Cobro.prototype.actualizar = function() {
    var dni = this.dni;
    var nombre_programa = this.nombre_programa;
    var id = this.id;
    var fecha = this.fecha;

    var monto = this.monto;
    var comentario = this.comentario;
    var estado = this.estado;


    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };
        client.query("update ciudad_de_los_niños_development.cobro set monto=" + monto + ", comentario='" + comentario + "', estado='"+estado+"' where dni='" + dni + "' and nombre_programa='"+nombre_programa+"' and id="+id+" and fecha='"+fecha+"'", function(err, result) {
            if (err) {
                console.log(err)
            }
            client.end(function(err) {
                if (err) {
                    console.log(err)
                };
            });
        });
    });
};

Cobro.prototype.eliminar = function() {
    var dni = this.dni;
    var nombre_programa = this.nombre_programa;
    var id = this.id;
    var fecha = this.fecha;
    client = new pg.Client(connectionString);
    var query=undefined
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };
        client.query("delete from ciudad_de_los_niños_development.cobro where id="+id+" and dni= '"+dni+"' and nombre_programa= '"+nombre_programa+"' and fecha= '"+fecha+"'", function(err, result) {
            if (err) {
                console.log(err)
            }
            if(result){

            }
            client.end(function(err) {
              if (err) {
                console.log(err)
                console.log("se cerro el client de eliminaraporte!")
              };
            });
        });
    });
};



Cobro.prototype.exist = function() {
    var dni = this.dni;
    var nombre_programa = this.nombre_programa;
    var id = this.id;
    var fecha = this.fecha;
    var thisrespaldo = this;
    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err);
        }
        client.query("SELECT * FROM ciudad_de_los_niños_development.cobro where dni='" + dni + "' and nombre_programa='"+nombre_programa+"' and fecha='"+fecha+"' and id="+id+"" , function(err, result) {
            if (err) throw err;
            if (result.rows[0]) {
                thisrespaldo.existe = true;
                console.log("Existe");
            }

            client.end(function(err) {
                if (err) {
                    console.log(err)
                };
            });
        });

    });

};





module.exports.cobro = Cobro;
