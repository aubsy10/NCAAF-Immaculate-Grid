import React, { useState, useEffect } from "react";
import Gridbox from "./Gridbox";
import "./Grid.css"
import RowHead from "./RowHead";
import ColHead from "./ColHead";


function catText(obj){ //Turns the text from the backend into a format that looks decent (helper function here)
    if(obj.Type === "0"){
        return ""+obj.Category+": "+obj.Value
    } else if(obj.Type === "1"){
        if(obj.Value[0] === "0") {
            return ""+obj.Category+": "+obj.Value.slice(2)+"+"
        } else if(obj.Value[0] === "1"){
            return ""+obj.Category+": "+obj.Value.slice(2)
        }
    } else if(obj.Type === "2"){
        return ""+obj.Category+": "+obj.Value+"+"
    }
}

function Grid(props){ // the function for the grid

    const [cats, setCats] = useState({}) //a useState for the categories
    const [loading, setLoading] = useState(true) //useState for if the grid is loading

    useEffect(() => { //gets the grid data when it loads
        gridData()
    }, [])

    const gridData = async () => { //fetches the data, and sets the loading to false
        const response = await fetch("/getGrid")
        setCats(await response.json());
        setLoading(false);
    }

    if(!loading){ //the grid itself, waits for the data from the api to load, and when it does returns the grid of gridboxes, colheads and rowheads
        return (
            <div>
            <div class="grid" > 
                <div></div>
                <ColHead cat={catText(cats["Col 0"])} />
                <ColHead cat={catText(cats["Col 1"])}/>
                <ColHead cat={catText(cats["Col 2"])} />
                <RowHead cat={catText(cats["Row 0"])} />
                <Gridbox gridNum={1} search={props.onSearch} close={props.onClose}/>
                <Gridbox gridNum={2} search={props.onSearch} close={props.onClose}/>
                <Gridbox gridNum={3} search={props.onSearch} close={props.onClose}/>
                <RowHead cat={catText(cats["Row 1"])} />
                <Gridbox gridNum={4} search={props.onSearch} close={props.onClose}/>
                <Gridbox gridNum={5} search={props.onSearch} close={props.onClose}/>
                <Gridbox gridNum={6} search={props.onSearch} close={props.onClose}/>
                <RowHead cat={catText(cats["Row 2"])} />
                <Gridbox gridNum={7} search={props.onSearch} close={props.onClose}/>
                <Gridbox gridNum={8} search={props.onSearch} close={props.onClose}/>
                <Gridbox gridNum={9} search={props.onSearch} close={props.onClose}/>
            </div>
            </div>
        
        )
    }
    

    
}

export default Grid;