import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import "./SearchBox.css"

function SearchBox(props){ //the searchbox itself, holds the results and searchbar

  const [results, setResults] = useState([]);


  return (
    <div>
      <div className="searchBarComp">
        <SearchBar setResults={setResults}/>
        <SearchResults results={results} state={props.state} ansHandler={props.ansHandler}/>

      </div>
    </div>
  );


};


export default SearchBox;


