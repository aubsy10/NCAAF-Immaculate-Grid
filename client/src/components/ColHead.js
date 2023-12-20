import React from "react";

function ColHead(props){ //formatting thing for the column heads

    return (
        <div class="Col">
            {props.cat}
        </div>
    
    )
    
}
export default ColHead;