const express = require('express')
const app = express()
const mysql = require('mysql2')
require('dotenv').config();
app.use(express.static('public'));

module.exports = app.post("/:SchoolA/:SchoolB/:SchoolC/:SchoolD/:SchoolE/:SchoolF/:SchoolG/:SchoolH/:SchoolI/:NumRight", (req, res) => {
    
    let host = process.env.host;

    let date = new Date().toDateString(); //gets the name of the table
    let table_name = "Grid_"+date.replace(/\s/g, '');
  
  
    const connection = mysql.createConnection({ //connects to the db
        host: process.env.host,
        user: process.env.username,
        password: process.env.password,
        database: process.env.database
    })
  
  connection.connect(function(err) { //uses sql to add row to the table
      if (err) throw err;
      console.log("Connected!");
      var sql = `INSERT INTO ${table_name} (G1, G2, G3, G4, G5, G6, G7, G8, G9, Total) VALUES ('${req.params.SchoolA}','${req.params.SchoolB}','${req.params.SchoolC}','${req.params.SchoolD}','${req.params.SchoolE}','${req.params.SchoolF}','${req.params.SchoolG}','${req.params.SchoolH}','${req.params.SchoolI}', '${req.params.NumRight}')`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
      });
    }); 

    connection.connect(function(err) { //selects Total row and returns it
      if (err) throw err;
      console.log("Connected!");
      var sql = `SELECT Total FROM ${table_name}`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        connection.end();
        let i =0; let retVals = [];
        for(let x of result){
          if(x.Total == null){
            x.Total = 0;
          }
          retVals[i] = x.Total
          i+=1;
        }
        res.send(retVals);
        connection.end();
      });
    });

  })