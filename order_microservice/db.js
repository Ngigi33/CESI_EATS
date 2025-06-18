// order-service/db.js
require('dotenv').config();
const mysql = require('mysql2/promise');


// const db = mysql.createPool({
//   host:'localhost' ,
//   user:'root',
//   password: '12345678',
//   database: 'cesi_eats'
// });

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = db;
