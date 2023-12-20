import React, {useState} from 'react'
import { FaSearch } from 'react-icons/fa'
import "./SearchBar.css"

export const SearchBar = ( {setResults}) => { //the search bar function
    const [input, setInput] = useState(""); //a use state to hold the user input

    const fetchData = (value) => { //fetches the team names using the api and filters based on the input
        fetch("/getTeams")
        .then((response) => response.json())
        .then((json) => {
            const results = json.teams.filter((team) => {
                return (
                    team&&
                    value&&
                    team.toLowerCase().includes(value.toLowerCase())
                )                    
            }); 
        setResults(results);
        })
    }

    const handleChange = (value) => { //fetches the data and sets the input
        setInput(value);
        fetchData(value);
    }


    return ( //returns the searchbar
        <div className="inputWrap">
            <FaSearch id="search-icon"/>
            <input placeholder="Search Here" value={input} onChange={(e) => handleChange(e.target.value)}/>
        
        </div>
    )
}