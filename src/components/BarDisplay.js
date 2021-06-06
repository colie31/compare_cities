import React from "react";

const BarDisplay = ({ score }) => {
    let color = score > 5 ? "green" : "red"

    return (
      <div className="bar-container">
        <div
          style={{
            backgroundColor: color,
            height: 25,
            width: score * 20,
          }}
        ></div>
      </div>
    );
}

export default BarDisplay;