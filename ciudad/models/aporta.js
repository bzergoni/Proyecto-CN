var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Aporta(d, np, mont, freq, i, fa, ec) {
    this.dni = d;
    this.nombre_programa = np;
    this.monto = mont;
    this.frecuencia = freq;
    this.id = i;
    this.fecha_aporte = fa;
    this.estado_cobro = ec;
    this.existe = undefined;
};

Aporta.prototype.show = function() {
    return this.dni + " | " + this.nombre_programa+ " | " + this.monto + " | " + this.frecuencia + " | " + this.id;
};

Aporta.prototype.cargar = function() {
    var dni = this.dni;
    var nombre_programa = this.nombre_programa;
    var id = this.id;
    var thisrespaldo = this;
    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err);
        }
        client.query("SELECT * FROM ciudad_de_los_niños_development.aporta where dni='" + dni + "' and nombre_programa='"+nombre_programa+"'", function(err, result) {
            if (err) throw err;
            if (result.rows[0]) {
                thisrespaldo.id=result.rows[0].id
                thisrespaldo.monto = result.rows[0].monto;
                thisrespaldo.frecuencia = result.rows[0].frecuencia;
                thisrespaldo.fecha_aporte = result.rows[0].fecha_aporte;
                thisrespaldo.estado_cobro = result.rows[0].estado_cobro;
                //console.log(thisrespaldo);
                thisrespaldo.existe=true;
            }
            //console.log(thisrespaldo)
            client.end(function(err) {
                if (err) {
                    console.log(err)
                };
            });
        });
    });
};
///Esta funcion se supone que inserte o actualize la tabla
Aporta.prototype.insertar = function() {
    var dni = this.dni;
    var nombre_programa = this.nombre_programa;
    var monto = this.monto;
    var frecuencia = this.frecuencia;
    var id = this.id;
    var fecha_aporte = this.fecha_aporte;
    var estado_cobro = this.estado_cobro;

    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };
        //console.log("insert into ciudad_de_los_niños_development.aporta values ('" + dni + "','" + nombre_programa + "'," + monto + ",'" + frecuencia + "'," + id + ");")
        client.query("insert into ciudad_de_los_niños_development.aporta values ('" + dni + "','" + nombre_programa + "'," + monto + ",'" + frecuencia + "'," + id + ",'"+fecha_aporte+"','"+estado_cobro+"');", function(err, result) {
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
Aporta.prototype.actualizar = function() {
    var dni = this.dni;
    var nombre_programa = this.nombre_programa;
    var monto = this.monto;
    var frecuencia = this.frecuencia;
    var id = this.id;
    var estado_cobro = this.estado_cobro;

    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };
        client.query("update ciudad_de_los_niños_development.aporta set monto=" + monto + ", frecuencia='" + frecuencia + "', estado_cobro='"+estado_cobro+"' where dni='" + dni + "' and nombre_programa='"+nombre_programa+"' and id="+id, function(err, result) {
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

Aporta.prototype.eliminar = function() {
    var dni = this.dni;
    var nombre_programa = this.nombre_programa;
    var id = this.id
    client = new pg.Client(connectionString);
    var query=undefined
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };
        client.query("select count (id) from ciudad_de_los_niños_development.aporta where id="+id, function(err, result) {
            if (err) {
                console.log(err)
            }
            if(result){
              if(result.rows[0].count < 2){
                query = "delete from ciudad_de_los_niños_development.medio_de_pago where id="+id
              }else{
                query ="delete from ciudad_de_los_niños_development.aporta  where dni='" + dni + "' and nombre_programa='"+nombre_programa+"' and id="+id
              }
              client.query(query, function (err, result) {
                if (err){console.log(err)}
                if(result){console.log("Se elimino el aporte!")}
              });
            }
            client.end(function(err) {
              if (err) {
                console.log(err)
                //console.log("se cerro el client de eliminaraporte!")
              };
            });
        });
    });
};

Aporta.prototype.eliminarPorDni = function() {
    var dni = this.dni;
    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };
        client.query("delete from ciudad_de_los_niños_development.aporta  where dni='" + dni + "'", function(err, result) {
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

Aporta.prototype.exist = function() {
    var dni = this.dni;
    var nombre_programa = this.nombre_programa;
    var id = this.id
    var thisrespaldo = this;
    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err);
        }
        client.query("SELECT * FROM ciudad_de_los_niños_development.aporta where dni='" + dni + "' and nombre_programa='"+nombre_programa+"'" , function(err, result) {
            if (err) throw err;
            if (result.rows[0]) {
                thisrespaldo.existe = true;
                //console.log("Existe");
            }

            client.end(function(err) {
                if (err) {
                    console.log(err)
                };
            });
        });

    });

};

module.exports.aporta = Aporta;
