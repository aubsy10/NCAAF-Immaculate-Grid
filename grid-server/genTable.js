//connects to the database, uses sql to create a table

const express = require('express')
const app = express()
const mysql = require('mysql2')
require('dotenv').config();
app.use(express.static('public'));


module.exports = app.post("/", (req, res) => {

  let host = process.env.host;

  let date = new Date().toDateString();
  let table_name = "Grid_"+date.replace(/\s/g, '');


  const connection = mysql.createConnection({
      host: process.env.host,
      user: process.env.username,
      password: process.env.password,
      database: process.env.database
  })

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE "+table_name+"(G1 VARCHAR(255), G2 VARCHAR(255), G3 VARCHAR(255), G4 VARCHAR(255), G5 VARCHAR(255), G6 VARCHAR(255), G7 VARCHAR(255), G8 VARCHAR(255), G9 VARCHAR(255), Total VARCHAR(255))";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
      connection.end();
      res.send("Done");
    });
  });



});
