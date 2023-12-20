import React from "react";
import "./SearchResults.css"
import SearchResult  from "./SearchResult";

export const SearchResults = (props) => { //returns the list of results, formated using the css file
    return(
        <div className="resultList">
            {
                props.results.map((result, id) => {
                    return <SearchResult result={result} key={id} state={props.state} ansHandler={props.ansHandler}/>
                })
            }
     
        </div>
    )
}