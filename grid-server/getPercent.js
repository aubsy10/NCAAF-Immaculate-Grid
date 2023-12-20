//Takes in a school, and returns the percentage of grids they are on

const express = require('express')
const app = express()
const mysql = require('mysql2')
require('dotenv').config();


//the function, takes in the team as well as the grid to know which column from the table to pull from
module.exports = app.get("/:School/:G", (req, res) => {
    
    let host = process.env.host;
    let date = new Date().toDateString();
    let table_name = "Grid_"+date.replace(/\s/g, '');
  
    //connects to the table using the naming convention
    const connection = mysql.createConnection({
        host: process.env.host,
        user: process.env.username,
        password: process.env.password,
        database: process.env.database
    })
  
  //uses sql to run a query which returns the % of grids that it falls in, and then rounds it
  connection.connect(function(err) {
      if (err) throw err;
      var sql = `SELECT ${req.params.G} FROM ${table_name}`;
      connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        connection.end();
        let apps = 1;
        for(let x of result){
            if(x[req.params.G] == req.params.School){
                apps += 1;
            }
        }
        let pct = Math.round((apps/(result.length+1))*100000) / 1000;
        res.send(pct.toString());
      });
    });

  })