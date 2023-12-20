const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.static('public'));

//returns a list of all of the teams from teams_list.json, used for the search bar feature

module.exports = app.get("/", (req, res) => {
    fs.readFile("./teams_list.json", (err, jsonString) => {
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