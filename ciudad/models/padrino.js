var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Padrino(number,em,tel,dir,cel,nac,cod) {
    this.dni = number;
    this.email=em;
    this.tel_fijo=tel;
    this.direccion=dir;
    this.celular=cel;
    this.fecha_nac=nac;

    this.cod_postal=cod;
    if(!cod){this.cod_postal=0000}
    this.existe = undefined;
};

/*
 *  Print a card
 */
Padrino.prototype.show = function() {
    return this.dni + " | " + this.email+ " | " + this.tel_fijo+ " | " + this.direccion+ " | " + this.celular+ " | " + this.fecha_nac+ " | " + this.cod_postal
};


Padrino.prototype.cargar = function() {
  client = new pg.Client(connectionString);

    var dni = this.dni;
    var thisrespaldo = this;
    client.connect(function(err) {
        if (err) {
            console.log(err);
        }


        // execute a query on our database
        console.log("comienza la carga de " + dni);
        console.log("SELECT * FROM ciudad_de_los_niños_development.padrino where dni='111222333'");
        console.log(thisrespaldo)
        client.query("SELECT * FROM ciudad_de_los_niños_development.padrino where dni='" + dni + "'", function(err, result) {
            if (err) throw err;
            if (result.rows[0]) {
                //repetirse para todos los campos
                thisrespaldo.existe=true;
                thisrespaldo.email = result.rows[0].email;
                thisrespaldo.tel_fijo = result.rows[0].tel_fijo;
                thisrespaldo.direccion = result.rows[0].direccion;
                thisrespaldo.celular = result.rows[0].celular;
                thisrespaldo.fecha_nac = result.rows[0].fecha_nac.toLocaleDateString();
                thisrespaldo.cod_postal = result.rows[0].cod_postal;

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
Padrino.prototype.insertar = function() {
    var dni = this.dni;
    var email = this.email;
    var tel_fijo=this.tel_fijo;
    var direccion=this.direccion;
    var celular=this.celular;
    var fecha_nac=this.fecha_nac;
    var cod_postal=this.cod_postal;

    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };
        // execute a query on our database
        console.log("insert into ciudad_de_los_niños_development.padrino values (" + dni + ",'" + email + "','" + tel_fijo + "','" + direccion + "','" + celular + "','" + fecha_nac + "'," + cod_postal + ");")
        client.query("insert into ciudad_de_los_niños_development.padrino values (" + dni + ",'" + email + "','" + tel_fijo + "','" + direccion + "','" + celular + "','" + fecha_nac + "'," + cod_postal + ");", function(err, result) {
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
Padrino.prototype.actualizar = function() {
    var dni = this.dni;
    var email = this.email;
    var tel_fijo=this.tel_fijo;
    var direccion=this.direccion;
    var celular=this.celular;
    var fecha_nac=this.fecha_nac;
    var cod_postal=this.cod_postal;
    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };
        // execute a query on our database
        client.query("update ciudad_de_los_niños_development.padrino set email='" + email + "', direccion='" + direccion + "', tel_fijo='" + tel_fijo + "', celular='" + celular + "', fecha_nac='" + fecha_nac + "', cod_postal=" + cod_postal + " where dni='" + dni + "'", function(err, result) {
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
Padrino.prototype.eliminar = function() {
    var dni = this.dni;
    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };
        // execute a query on our database
        client.query("delete from ciudad_de_los_niños_development.padrino  where dni='" + dni + "'", function(err, result) {
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


Padrino.prototype.exist = function() {
    var dni = this.dni;
    var thisrespaldo = this;
    client = new pg.Client(connectionString);

    client.connect(function(err) {
        if (err) {
            console.log(err);
        }
        client.query("SELECT * FROM ciudad_de_los_niños_development.padrino where dni='" + dni + "'", function(err, result) {
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


module.exports.padrino = Padrino;
