const mysql = require('mysql2/promise');
// require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // port: 3306,
});

connection.getConnection((err, connection) => {
    if(err instanceof Error){
        console.log(err);
        return;
    }
})


module.exports = connection;

