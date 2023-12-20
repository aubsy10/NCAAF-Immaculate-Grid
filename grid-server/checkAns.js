//Checks the answer that the user submitted with the teams data to see if it is right

const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.static('public'));

function checkVal(grid, teams, sTeam, ArrName, ArrVal){ //depending on the type of the category, different checks are needed and so we have this if statement, where type 0s check if its equal, type 1s have 2 possibilities, one where values get mapped to a certain range that the submitted value needs to fall in, and the other where the value has to be greater than a certain value, and finally type 2s which is a >= check
    if(grid[ArrName+ArrVal].Type == "0" && teams[sTeam][grid[ArrName+ArrVal].Category] == grid[ArrName+ArrVal].Value){
        return true;
    } else if(grid[ArrName+ArrVal].Type == "1"){
        if(grid[ArrName+ArrVal].Value[0] == "0" && teams[sTeam][grid[ArrName+ArrVal].Category][0] >= grid[ArrName+ArrVal].Value.slice(2)){
            return true
        } else if(grid[ArrName+ArrVal].Value[0] == "1"){
            let minVal =0; let maxVal = 0;
            if(grid[ArrName+ArrVal].Value.slice(2) == "Prehistoric"){
                maxVal = 1935;
            } else if (grid[ArrName+ArrVal].Value.slice(2) == "AP"){
                minVal = 1936; maxVal = 1991;
            } else if (grid[ArrName+ArrVal].Value.slice(2) == "BCS"){
                minVal = 1992; maxVal = 2013;
            } else {
                minVal = 2014; maxVal = 3000;
            }
            for(let i = 1; i<teams[sTeam][grid[ArrName+ArrVal].Category].length; ++i){
                if(teams[sTeam][grid[ArrName+ArrVal].Category][i] >= minVal && teams[sTeam][grid[ArrName+ArrVal].Category][i] <= maxVal){
                    return true
                }
            }
        }
    } else if(grid[ArrName+ArrVal].Type == "2" && teams[sTeam][grid[ArrName+ArrVal].Category] >= grid[ArrName+ArrVal].Value) {
        return true
    } 
    return false;
}

module.exports = app.get("/:Team/:Col/:Row", (req, res) => {
    const grid = JSON.parse(fs.readFileSync("./grid.json",'utf8'));
    const teams = JSON.parse(fs.readFileSync("./teams_data.json",'utf8'));
    let sTeam = req.params.Team
    let Col = req.params.Col
    let Row = req.params.Row
    if(checkVal(grid, teams, sTeam, "Row ", Row) && checkVal(grid, teams, sTeam, "Col ", Col)){ //calls the checkVal function for both rows and columns because both need to be right for the answer to be right
        res.send(true)
    } else{
        res.send(false)
    }

  })