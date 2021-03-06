var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);

function Programa(name, descr) {
    this.nombre_programa = name;
    this.descripcion = descr;
    this.existe=false;
    this.existeLogico=undefined

};




Programa.prototype.show = function() {
    return this.nombre_programa + " | " + this.descripcion;
};


Programa.prototype.cargar = function() {
    client = new pg.Client(connectionString);
    var nombre = this.nombre_programa;
    var thisrespaldo = this;
    client.connect(function(err) {
        if (err) {
            console.log(err);
        }

        console.log("SELECT * FROM ciudad_de_los_niños_development.programa where nombre_programa='asado'");

        client.query("SELECT * FROM ciudad_de_los_niños_development.programa where nombre_programa='" + nombre + "'", function(err, result) {
            if (err) throw err;
            if (result.rows[0]) {

                thisrespaldo.descripcion = result.rows[0].descripcion;
                thisrespaldo.existe=true;

            }
            client.end(function(err) {
                if (err) {
                    console.log(err)
                };
            });
        });
    });
};
Programa.prototype.insertar = function() {
    var nombre = this.nombre_programa;
    var descripcion = this.descripcion;

    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };

        client.query("insert into ciudad_de_los_niños_development.programa values ('" + nombre + "','" + descripcion + "');", function(err, result) {
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

Programa.prototype.insertarLOGIC = function(){
  var nombre_programa=this.nombre_programa;

  client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) {console.log(err)};

    client.query("update ciudad_de_los_niños_development.programa set existe=true where nombre_programa='"+nombre_programa+"'", function (err, result) {
      if (err){console.log(err)}


      client.end(function (err) {
        if (err){ console.log(err)};
      });
    });
  });
};


Programa.prototype.actualizar = function() {
    var nombre = this.nombre_programa;
    var descripcion = this.descripcion;

    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };

        client.query("update ciudad_de_los_niños_development.programa set descripcion='" + descripcion + "' where nombre_programa='" + nombre + "'", function(err, result) {
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


Programa.prototype.eliminar = function() {
    var nombre = this.nombre_programa;
    client = new pg.Client(connectionString);
    client.connect(function(err) {
        if (err) {
            console.log(err)
        };

        client.query("delete from ciudad_de_los_niños_development.programa where nombre_programa='"+nombre+"'", function(err, result) {
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


Programa.prototype.exist = function() {
    var nombre = this.nombre_programa;
    var thisrespaldo = this;

    client.connect(function(err) {
        if (err) {
            console.log(err);
        }
        client.query("SELECT * FROM ciudad_de_los_niños_development.programa where nombre_programa='" + nombre + "'", function(err, result) {
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

Programa.prototype.listaProgramas=function(){
  var thisrespaldo = this;
    client = new pg.Client(connectionString);
  client.connect(function(err) {
      if (err) {
          console.log(err);
      }
      client.query("SELECT DISTINCT nombre_programa FROM ciudad_de_los_niños_development.programa ", function(err, result) {
          if (err) throw err;
          if (result.rows[0]) {
              thisrespaldo.lista = result.rows;
          }
          client.end(function(err) {
              if (err) {
                  console.log(err)
              };
          });
      });

  });

}



module.exports.programa = Programa;
