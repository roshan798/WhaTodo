const mysql = require("mysql2");
require('dotenv').config();
 const options = {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
}
const connection = mysql.createConnection(options);
module.exports = connection;