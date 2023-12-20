import React from "react";
import "./finpop.css";

function FinPop(props) { //popup menu for when grid is filled in


    return (
        <div class="popMenu">
            <p>Right Answers: {props.state.rightAns}</p>
            <p>Wrong Answers: {props.state.wrongAns}</p>
            <p>Average Correct Answers: {props.state.avg}</p>
            <button class="finBut" onClick={props.closeMenu}>Close</button>
        </div>
    )
}

export default FinPop;