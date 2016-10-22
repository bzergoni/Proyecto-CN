var pg = require('pg');

var connectionString = "pg://postgres:root@localhost:5432/postgres";
  var results = [];

var client = new pg.Client(connectionString);

// connect to our database
client.connect(function (err) {
  if (err) throw err;

  // execute a query on our database
  client.query("SELECT dni FROM ciudad_de_los_niños_development.persona where dni='1'", function (err, result) {
    if (err) throw err;
    console.log(result.rows[0]);
    // just print the result to the console
   //var i=0;
   // while (i<result.rowCount){
    	//console.log(result.rows[i].dni+'||'+result.rows[i].n_y_ap); // outputs: { name: 'brianc' }
		//i++;
	//}
    // disconnect the client
    client.end(function (err) {
      if (err) throw err;
    });
  });
});





//console.log("supuestamente hizo la conexion");
//var queryloca=client.query("SELECT * FROM ciudad_de_los_niños_development.persona");
//console.log(queryloca);