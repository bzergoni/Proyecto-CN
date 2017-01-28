var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Aporta(mont, freq) {
    this.dni = undefined;
    this.nombre_programa = undefined;
    this.monto = mont;
    this.frecuencia = freq;
    this.id = undefined;
    this.existe = undefined;
};

/*
 *  Print a card
 */
Aporta.prototype.show = function() {
    return this.dni + " | " + this.nombre_programa+ " | " + this.monto + " | " + this.frecuencia + " | " + this.id;
};


Aporta.prototype.cargar = function() {

    var dni = this.dni;
    var nombre_programa = this.nombre_programa;
    var id = this.id;
    var thisrespaldo = this;
    client.connect(function(err) {
        if (err) {
            console.log(err);
        }

        client.query("SELECT * FROM ciudad_de_los_niños_development.aporta where dni='" + dni + "' and nombre_programa='"+nombre_programa+"' and id="+id, function(err, result) {
            if (err) throw err;
            if (result.rows[0]) {

                thisrespaldo.monto = result.rows[0].monto;
                thisrespaldo.frecuencia = result.rows[0].frecuencia;
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
Aporta.prototype.insertar = function() {
    var dni = this.dni;
    var nombre_programa = this.nombre_programa;
    var monto = this.monto;
    var frecuencia = this.frecuencia;
    var id = this.id;

    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };
        
        client.query("insert into ciudad_de_los_niños_development.aporta values ('" + dni + "','" + nombre_programa + "'," + monto + ",'" + frecuencia + "'," + id + ");", function(err, result) {
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
    var id = this.id
    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };
        // execute a query on our database
        client.query("update ciudad_de_los_niños_development.aporta set monto=" + monto + ", frecuencia='" + frecuencia + "' where dni='" + dni + "' and nombre_programa='"+nombre_programa+"' and id="+id, function(err, result) {
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
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };
        // execute a query on our database
        client.query("delete from ciudad_de_los_niños_development.aporta  where dni='" + dni + "' and nombre_programa='"+nombre_programa+"' and id="+id, function(err, result) {
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

    client.connect(function(err) {
        if (err) {
            console.log(err);
        }
        client.query("SELECT * FROM ciudad_de_los_niños_development.aporta where where dni='" + dni + "' and nombre_programa='"+nombre_programa+"' and id="+id, function(err, result) {
            if (err) throw err;
            if (result.rows[0]) {
                thisrespaldo.existe = true;

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
