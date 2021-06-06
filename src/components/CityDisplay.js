import React from "react";

const CityDisplay = ({ city }) => {
   
    if(city.error) return <div>{`${city.error} For City ${city.name}`}</div>
    if(!city.score) return <div>Loading...</div>
    
    const cityFiveCategories = city.score.filter(category => {
       return category.name === "Housing" ||
        category.name === "Cost of Living" ||
        category.name === "Safety" ||
        category.name === "Healthcare" ||
        category.name === "Education"   ||
        category.name === "Error"
    })

    return (
        <>
        <h1>{city.name}</h1>
        {cityFiveCategories.length && cityFiveCategories.map(category => {
            let roundedNumber = Math.round(category.score_out_of_10 * 10) / 10;

            return (
                <div key={category.name}>
                <h4>{category.name}</h4>
                <p>{`${roundedNumber} / 10`}</p>
                </div>
            )
            })}
        </>
    )

};

export default CityDisplay;