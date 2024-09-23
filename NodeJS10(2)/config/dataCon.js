const mysql = require('mysql2');

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pallavi@2004',
    database: 'bookings'
});

pool.connect((err) => {
    if (err) {
        console.error('Could not connect to database', err.message);
    } else console.log('Connected to the database sucessfully');
});

module.exports = pool.promise();