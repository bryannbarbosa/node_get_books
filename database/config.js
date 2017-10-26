const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'maciv_flipbook'
});

conn.connect((err) => {
  if (err) throw err;
  console.log('MySQL is connected');
});

module.exports = conn;