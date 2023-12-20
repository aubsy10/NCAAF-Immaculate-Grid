//Generates a new grid where each of the squares have a minimum of 2 possible answers

const express = require('express')
const app = express()
const fs = require('fs')


function numToCats(arr, cats){ //Calls the getOneCat for every row/col(arr) 
    for(let i = 0; i<3; ++i){
        getOneCat(arr, cats, i)
    } 
}

function getOneCat(arr, cats, i){ //gets the text value of the category based on the random number that gets assigned to it
    for(let x in cats){
        if( arr[i][0] == `${cats[x].Key}`){
            arr[i][1] = x;
            return 0;
        }
    }
}

function getSubCat(cats, inCat){ //gets the subcategory for each of the categories, formula is different based on the type of category 
    if(cats[inCat].Type == 0){ //if the type is 0, it'll just pull a random number from the list and then get the category based on the number
        return cats[inCat].List[Math.floor(Math.random()*cats[inCat].List.length)];
    } else if(cats[inCat].Type == 1){
        let mode = Math.floor(Math.random()*2)
        if(mode == 0){
            return [mode, cats[inCat].Count[Math.floor(Math.random()*cats[inCat].Count.length)]]; //random number from the count column, and gets the text
        } else{
            return [mode, cats[inCat].Eras[Math.floor(Math.random()*cats[inCat].Eras.length)]]; //pulls random number, and gets the era corresponding
        }
    } else if(cats[inCat].Type == 2){ //from the count column, it pulls a random number to get it
        return cats[inCat].Count[Math.floor(Math.random()*cats[inCat].Count.length)];
    }

}

async function getCols(cats, cols){ //function which sets the cols. Each of them get set their random number, and then it makes sure that none of them have the same category, otherwise it'll reroll until they are all different
    let wrong = true
    while(wrong){
        cols[0][0] = Math.floor(Math.random()*11)
        cols[1][0] = Math.floor(Math.random()*11)
        cols[2][0] = Math.floor(Math.random()*11)
        if(cols[0][0] != cols[1][0] && cols[0][0] != cols[2][0] && cols[1][0] != cols[2][0]){
            wrong = false
            numToCats(cols, cats)
            }
        }

    for(let i = 0; i<3; ++i){ //gets the subcategorys and sets [i][3] to their type
        cols[i][2] = getSubCat(cats, cols[i][1]);
        cols[i][3] = cats[cols[i][1]].Type;
    }
}


function getRows(cats, cols, rows){ //gets the rows ensuring there are at least 2 possible answers for every square
    let teams = JSON.parse(fs.readFileSync('./teams_data.json', 'utf8'));
    let valid = false;
    for(let i = 0; i<3; ++i){
        valid = false
        let j = 0;
        while(!valid){ //rolls the categories and subcategories until it can validate with the checkbox function that its good
            rows[i][0] = Math.floor(Math.random()*11);
            getOneCat(rows, cats,i)
            rows[i][2] = getSubCat(cats, rows[i][1]);
            rows[i][3] = cats[rows[i][1]].Type;
            valid = checkBox(cols, rows, teams, i)
            j += 1;
            if(j > 100){ //ensures that it doesn't take forever if the columns are hard to work with, which if this returns true causes the columns to get rerolled
                return true;
            }
        }
    }
    return false; //returns false when everything is good, ie its false that the function needs to reroll the columns
        

}   

function checkBox(cols, rows, teams, i){ //the function that checks, this thing is a mess but what happens is it goes through the list, checks for certain criteria from the teams data list, and if thats found, adds 1 to a counter that tracks the amount of right answes there are. If there are enough right answers, then it returns true which signifies that everything is good, if not, false is returned which signals a reroll.
    //Type 0 checks involve matchin, type 1 involves determining the subcat and either finding the value in a range or seeing if the value is greater than a number, type 2 involves seeing if a number is greater than another number
for(let j = 0; j<3; ++j){
    if(rows[i][1] == cols[j][1] && (rows[i][2] == cols[j][2] || rows[i][3] == 2 || (rows[i][3] == 1 && rows[i][2][0] == 0))){
        return false;
    }
}
for(let j = 0; j<i; ++j){
    if(rows[i][1] == rows[j][1]){
        return false;
    }
}
let corAns = 0;
if(rows[i][3] == 0){
    for(let j = 0; j<3; ++j){
        corAns = 0;
        if(cols[j][3] == 0) {
            for(let x in teams){
                if((`${teams[x][cols[j][1]]}` == cols[j][2]) && (`${teams[x][rows[i][1]]}` == rows[i][2])){
                    corAns += 1;
                }
            }
            console.log(corAns)
            if(corAns <= 2){
                return false
            }
        } else if(cols[j][3] == 1) {
            if(cols[j][2][0] == 0){
                for(let x in teams){
                        if((`${teams[x][cols[j][1]][0]}` >= cols[j][2][1]) && (`${teams[x][rows[i][1]]}` == rows[i][2])){
                            corAns +=1;
                        }
                    }
                console.log(corAns)
                if(corAns <= 2){
                    return false
                }     
            } else if(cols[j][2][0] == 1){
                let vals = getMinMax(cols, j);
                for(let x in teams){
                    if(`${teams[x][rows[i][1]]}` == rows[i][2]){
                        for(let k = 1; k<`${teams[x][cols[j][1]]}`.length; ++k ){
                            if(`${teams[x][cols[j][1]]}`[k] >= vals[0] && `${teams[x][cols[j][1]]}`[k] <= vals[1]){
                                corAns +=1;
                            }
                        }
                    }
                }
                console.log(corAns)
                if(corAns <= 2){
                    return false
                }
            }
        } else if(cols[j][3] == 2){
            for(let x in teams){
                if((`${teams[x][cols[j][1]]}` >= cols[j][2]) && (`${teams[x][rows[i][1]]}` == rows[i][2])){
                    corAns += 1;
                }
            }
            console.log(corAns)
            if(corAns <= 2){
                return false
            }
        }
    }    
} else if(rows[i][3] == 1){
    for(let j = 0; j<3; ++j){
        corAns = 0;
        for(let x in teams){
            if(tOneValidation(x, teams, rows, i)){
                if(cols[j][3] == 0 && `${teams[x][cols[j][1]]}` == cols[j][2]){
                corAns +=1
                } else if(cols[j][3]== 1 && tOneValidation(x, teams, cols, j)){
                    corAns += 1
                } else if(cols[j][3]== 2 && `${teams[x][cols[j][1]]}` >= cols[j][2]){
                    corAns +=1;
                }
            }
        }
        console.log(corAns)
        if (corAns <= 2){
            return false;
        }
    }

} else if(rows[i][3] == 2){
    for(let j = 0; j<3; ++j){
        corAns = 0;
        if(cols[j][3] == 0) {
            for(let x in teams){
                if((`${teams[x][cols[j][1]]}` == cols[j][2]) && (`${teams[x][rows[i][1]]}` >= rows[i][2])){
                    corAns += 1;
                }
            }
            console.log(corAns)
            if(corAns <= 2){
                return false
            }
        } else if(cols[j][3]== 1) {
            if(cols[j][2][0] == 0){
                for(let x in teams){
                        if((`${teams[x][cols[j][1]][0]}` >= cols[j][2][1]) && (`${teams[x][rows[i][1]]}` >= rows[i][2])){
                            corAns +=1;
                        }
                    }
                console.log(corAns)
                if(corAns <= 2){
                    return false
                }     
            } else if(cols[j][2][0] == 1){
                let vals = getMinMax(cols, j);
                for(let x in teams){
                    if(`${teams[x][rows[i][1]]}` >= rows[i][2]){
                        for(let k = 1; k<`${teams[x][cols[j][1]]}`.length; ++k ){
                            if(`${teams[x][cols[j][1]]}`[k] >= vals[0] && `${teams[x][cols[j][1]]}`[k] <= vals[1]){
                                corAns +=1;
                            }
                        }
                    }
                }
                console.log(corAns)
                if(corAns <= 2){
                    return false
                }
            }
        } else if(cols[j][3] == 2){
            for(let x in teams){
                if((`${teams[x][cols[j][1]]}` >= cols[j][2]) && (`${teams[x][rows[i][1]]}` >= rows[i][2])){
                    corAns += 1;
                }
            }
            console.log(corAns)
            if(corAns <= 2){
                return false
            }
        }
    }
}

return true
    
}

function getMinMax(arr, ind){ //returns the range based on the passed era
    let minVal =0; let maxVal = 0;
    if(arr[ind][2][1] == "Prehistoric"){
        maxVal = 1935;
    } else if (arr[ind][2][1] == "AP"){
        minVal = 1936; maxVal = 1991;
    } else if (arr[ind][2][1] == "BCS"){
        minVal = 1992; maxVal = 2013;
    } else {
        minVal = 2014; maxVal = 3000;
    }
    return [minVal, maxVal];
}

function tOneValidation(x, teams, arr, ind){ //a simpler way to validate type ones, because otherwise it was a lot messier since they need to validate this plus a whole other thing
    if(arr[ind][2][0] == 0){
        if(`${teams[x][arr[ind][1]]}` == arr[ind][2]){
            return true
        }
    } else if(arr[ind][2][0] == 1){
        let vals = getMinMax(arr, ind);
        for(let k = 1; k<`${teams[x][arr[ind][1]]}`.length; ++k ){
            if(`${teams[x][arr[ind][1]]}`[k] >= vals[0] && `${teams[x][arr[ind][1]]}`[k] <= vals[1]){
                return true
            }
        }
    }
}

module.exports = app.post("/", (req, res) => { //the main of the file, it rerolls the rows and columns until bad is false which tells it to stop the rerolls
    var cats= JSON.parse(fs.readFileSync('./cats.json', 'utf8'));
    let cols = [[],[],[]];
    let rows = [[],[],[]];
    let bad = true
    while(bad) {
        getCols(cats, cols);
        bad = getRows(cats, cols, rows);
    }
    let storedGame = '{ "Col 0": { "Category":"'+cols[0][1]+'" , "Value":"'+cols[0][2]+'", "Type":"'+cols[0][3]+'"},\
    "Col 1": {"Category":"'+cols[1][1]+'" , "Value":"'+cols[1][2]+'", "Type":"'+cols[1][3]+'"},\
    "Col 2": {"Category":"'+cols[2][1]+'" , "Value":"'+cols[2][2]+'", "Type":"'+cols[2][3]+'"},\
    "Row 0": {"Category":"'+rows[0][1]+'" , "Value":"'+rows[0][2]+'", "Type":"'+rows[0][3]+'"},\
    "Row 1": {"Category":"'+rows[1][1]+'" , "Value":"'+rows[1][2]+'", "Type":"'+rows[1][3]+'"},\
    "Row 2": {"Category":"'+rows[2][1]+'" , "Value":"'+rows[2][2]+'", "Type":"'+rows[2][3]+'"}\
    }'
    fs.unlinkSync("./grid.json");
    fs.writeFile("./grid.json", storedGame, err => {
        if(err){
            console.log(err);
        }
    });
    res.send([...cols, ...rows]); //sends an array with the cols and rows, while storing the generated game in a file
  })