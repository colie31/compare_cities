import React from "react";

const BarDisplay = ({ score }) => {

    return (
        <div style={{ 
            backgroundColor: "green",
            height: 25,
            width: score * 20
        }}></div>
    )
}

export default BarDisplay;