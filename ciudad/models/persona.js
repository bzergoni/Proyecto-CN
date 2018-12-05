var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Persona(number,nya) {
    this.dni = number;
    this.n_y_ap=nya;
    this.existe = undefined;
};


Persona.prototype.show = function() {
    return this.dni + " | " + this.n_y_ap;
};


Persona.prototype.cargar = function() {
    client = new pg.Client(connectionString);
    var dni = this.dni;
    var thisrespaldo = this;
    client.connect(function(err) {
        if (err) {
            console.log(err);
        }



        console.log("SELECT * FROM ciudad_de_los_niños_development.persona where dni='111222333'");

        client.query("SELECT * FROM ciudad_de_los_niños_development.persona where dni='" + dni + "'", function(err, result) {
            if (err) throw err;
            if (result.rows[0]) {

                thisrespaldo.existe=true;
                thisrespaldo.n_y_ap = result.rows[0].n_y_ap;


            }

            client.end(function(err) {
                if (err) {
                    console.log(err)
                };
            });
        });

    });
};
Persona.prototype.insertar = function() {
    var dni = this.dni;
    var n_y_ap = this.n_y_ap;

    var client = new pg.Client(connectionString);

    client.connect(function(err) {
        if (err) {
            console.log(err)
        };

        console.log("insert into ciudad_de_los_niños_development.persona values ('" + dni + "'," + n_y_ap + "');")
        client.query("insert into ciudad_de_los_niños_development.persona values (" + dni + ",'" + n_y_ap + "');", function(err, result) {
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


Persona.prototype.actualizar = function() {
    var dni = this.dni;
    var n_y_ap = this.n_y_ap;
    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };

        client.query("update ciudad_de_los_niños_development.persona set n_y_ap='" + n_y_ap + "' where dni='" + dni + "'", function(err, result) {
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
Persona.prototype.eliminar = function() {
    var dni = this.dni;
    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };

        client.query("delete from ciudad_de_los_niños_development.persona  where dni='" + dni + "'", function(err, result) {
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


Persona.prototype.exist = function() {
    var dni = this.dni;
    var thisrespaldo = this;
    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err);
        }
        client.query("SELECT * FROM ciudad_de_los_niños_development.persona where dni='" + dni + "'", function(err, result) {
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


module.exports.persona = Persona;
