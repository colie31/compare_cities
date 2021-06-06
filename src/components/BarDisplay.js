import React from "react";

const BarDisplay = ({ score }) => {
    let color = score > 5 ? "green" : "red"

    return (
        <div style={{ 
            backgroundColor: color,
            height: 25,
            width: score * 20
        }}></div>
    )
}

export default BarDisplay;