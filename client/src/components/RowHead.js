import React from "react";
import "./Grid.css"

function RowHead(props){

    
    return ( //used for formatting the row
        <div class="Row">
            {props.cat}
        </div>
    
    )

    
}

export default RowHead;