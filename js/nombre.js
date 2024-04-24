alert("TEST")
alert("Commit")

//const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Crear una nueva base de datos en memoria
const db = new sqlite3.Database(':memory:');

// Nombre del archivo SQLite en disco
const filename = './db/osi.db';

// Abrir una conexión a la base de datos en disco
const dbOnDisk = new sqlite3.Database(filename);

// Consulta para obtener todos los datos de una tabla
const query = 'CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY,value TEXT)';

// Ejecutar la consulta en la base de datos en disco y insertar los datos en la base de datos en memoria
dbOnDisk.each(query, (err, row) => {
    if (err) {
        console.error(err.message);
    } else {
        // Insertar un valor de testeo en la tabla
        const insertQuery = 'INSERT INTO test_table (value) VALUES (?)';
        const testValue = 'Hola, mundo!';

        db.run(insertQuery, [testValue], (err) => {
            if (err) {
                console.error('Error al insertar el valor de testeo:', err.message);
            } else {
                console.log('Valor de testeo insertado correctamente.');
            }
        });
    }
});

// Cerrar la conexión a la base de datos en disco
dbOnDisk.close();

// Ahora la base de datos en memoria contiene los datos del archivo en disco
