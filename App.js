import './App.css';
import React, { Component } from 'react';
import Grid from './components/Grid';
import SearchBox from './components/SearchBox';
import FinPop from './components/finPop';
import $ from 'jquery';

class App extends Component { //the main compoennt

  constructor(){ //constructor, initiates the functions that update the state to allow them to do so, initiates state
    super()
    this.state = {isComplete: false, search: false, popMenu: false, activeGrid: 0, aGridFunct: "n/a", rightAns: 0, wrongAns: 0, avg:""}
    this.onSearch = this.onSearch.bind(this);
    this.searchClose = this.searchClose.bind(this);
    this.updateAnswers = this.updateAnswers.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  onSearch(key, gridFunct) { //allows searchbar to appear and dims screen
    if(!this.state.search) {
      this.setState({search: true, activeGrid: key, aGridFunct: gridFunct});
      $('#notSearch').addClass("dim")
    }
  }

  searchClose(){ //closes the searchbar and removes dim
    if(this.state.search){
      this.setState({search: false});
      $('#notSearch').removeClass("dim")
      this.setState({activeGrid: 0})
    }
  }

  updateAnswers(isRight){ //updates the state for the answers every time it is submitted whether it is right or wrong, handles the if the grid is done and brings pop up which shows score
    if(isRight){
      this.setState({ rightAns: this.state.rightAns + 1})
    } else{
      this.setState({ wrongAns: this.state.wrongAns + 1})
    }

    if(this.state.wrongAns + this.state.rightAns >= 8){
      this.setState({isComplete: true})
      let i = 0;
      let schools = [];
      for(let x of document.getElementsByClassName("gridText")){
        schools[i] = x.innerHTML;
        i++
      }
      fetch(`./postGrid/${schools[0]}/${schools[1]}/${schools[2]}/${schools[3]}/${schools[4]}/${schools[5]}/${schools[6]}/${schools[7]}/${schools[8]}/${this.state.rightAns}`, {method: 'POST'}).then(
        (response) => response.json()).then(
          (data) => {
            let sum = 0;
            for(let x of data){
              sum += parseInt(x);
            }
            let avg = Math.round((sum/data.length) * 1000) / 1000;
            $('#notSearch').addClass("dim")
            this.setState({popMenu: true, avg: avg});
          }
          );
      
    }

  }
  
  async genGrid(){ //wouldn't be a thing if I was actually hosting this, but this just makes things easier... also only works once a day because thats how it should be, as there is a unique grid every day
    try {
      const response = await fetch('/genTable', {method: 'POST'});
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      try {
        const resp = await fetch('/genNewGrid', {method:'POST'}) 
        if(!resp.ok){
          throw new Error(`${response.status} ${response.statusText}`);
        }
      } catch (err){
        console.log("GridGen Error: "+err)
      }
    } catch (error) {
      console.log("Table Error:" + error);
    }
  }

  closeMenu(){
    this.setState({popMenu: false})
    $('#notSearch').removeClass("dim");

  }
  
  
  render() { //renders the app, note the button is only there for testing, and wouldn't normally be deployed, its function would be automated if I wanted to host it
    return (
      <div className="App">
        <body>
        {this.state.search ? <SearchBox state={this.state} ansHandler={this.updateAnswers} /> : null}
        {this.state.popMenu ? <FinPop state={this.state} closeMenu={this.closeMenu}/> : null}
        <div id="notSearch" onClick={this.searchClose}>
          <Grid search={this.state} onSearch={this.onSearch} onClose={this.searchClose}/> 
          <button onClick={this.genGrid}>Generate Grid (Once Per Day, otherwise you have to reset the server. Used to reset grid daily)</button> 
        </div>
        </body>
      </div>
    );
  }

}

export default App;
