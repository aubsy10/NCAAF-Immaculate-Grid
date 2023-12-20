import React from "react";
import "./SearchResult.css"

async function checkAnswer(props){ //used to check the answer, in this file because it takes the result aka user input, calls the api and sees if the answer is right
    let Col = 0;
    let Row = Math.floor((props.state.activeGrid-1)/3);
    if (Row === 0) {
        Col = props.state.activeGrid-1;
    } else if (Row === 1){
        Col = props.state.activeGrid-4;
    } else if(Row === 2){
        Col = props.state.activeGrid-7;
    }

    return await fetch("/checkAns/"+props.result+"/"+Col+"/"+Row).then( response => response.json()).then(data => {
        return data;
    })
}

async function onEnter(props){ //checks the answer, and calls the aGridFunct(isRight from Gridbox.js to figure out how to handle it)
    let check = await checkAnswer(props); 
    props.state.aGridFunct(check, props.result, props.ansHandler);
    props.state.search = 0;
}

function SearchResult(props){ //returns the individual result
    return (
        <div className="searchResult" onClick={(e) => onEnter(props)}>{props.result}</div>
    )
}

export default SearchResult;