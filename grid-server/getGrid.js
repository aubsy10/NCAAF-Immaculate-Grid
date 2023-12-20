//Gets the contents from grid.json and returns them so that the front end can output the grid 
const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.static('public'));

module.exports = app.get("/", (req, res) => {
    fs.readFile("./grid.json", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        try{
            data = JSON.parse(jsonString);
            res.json(data)
        } catch(err){
            console.log("Error when parsing"+err);
        }
      });
})