/* eslint-disable jsx-a11y/alt-text */
import React, { Component} from "react";
import "./Grid.css"

//needs to be a class because of state things
class Gridbox extends Component {
    constructor() { //constructor which sets its state status to 0
        super()
        this.setState({status: 0})
        this.isRight = this.isRight.bind(this);
    }

    isRight(check, result, ansHandler){ //function to handle if an answer is right, what it does is it sets the grid text to user input, uses the api to get the % of answers that match what the user inputed to set that text to that, and checks if the answer is right or wrong
        this.props.close();
        let gridBox = document.getElementById("GridBox"+this.props.gridNum);
        let gridText = document.getElementById("GridText"+this.props.gridNum);
        let gridPct = document.getElementById("GridPct"+this.props.gridNum);
        gridText.style.display = "block";
        gridText.innerHTML = result;
        gridBox.disabled = true;
        console.log(fetch(`./getPercent/${result}/G${this.props.gridNum}`).then((response) => response.json()).then((data) => gridPct.innerHTML = data+"%"));
        gridPct.style.display = "block";
        result = result.replace(/\s/g, '');
        result = result.toLowerCase();
        document.getElementById("GridImg"+this.props.gridNum).src = "http://localhost:8000/logos/"+result+".png";
        if(check){ //right answer -> gives the green bg
            this.setState({Status:1})
            gridBox.classList.add("correct");    
        } else { //wrong answer -> red bg
            this.setState({staus:2}); 
            gridBox.classList.add("incorrect");   
        }

        ansHandler(check); //function from the main which is used to make the api calls to check if the grid is done and what to do there


    }

    render() { //returns the 4 parts of the grid box in one div, the div itself, the image, the percentage text, and the school (gridText) text 
        return (
            <div class="gridBox" id={"GridBox"+this.props.gridNum} onClick={() => this.props.search(this.props.gridNum, this.isRight)}>
             <p class="gridPct" id={"GridPct"+this.props.gridNum} style={{display: "none"}} >hi!</p>
            <img src={""} alt="" class="gridImg" id={"GridImg"+this.props.gridNum}></img>
            <p class="gridText" id={"GridText"+this.props.gridNum} style={{display: "none"}} >hi!</p>
            </div>
            )
    }
    
    
    
}

export default Gridbox;