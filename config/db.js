//requerimos la libreria mysql
const mysql      = require('mysql');

//funcion para crear la conexion con la bbdd
const connection = mysql.createConnection({
  host     : 'db4free.net',
  user     : 'rootcode',
  password : 'rootroot',
  database : 'api_coches'
});
 
connection.connect(
    function(error){
        if(error) throw error;
        console.log('Conexion establecida correctamente: ' + 
            connection.config.database);
        }
);

module.exports = connection;