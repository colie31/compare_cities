import React, { useEffect, useState } from "react";

const CityDisplay = ({ city }) => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        fetch(city)
        .then(response => response.json())
        .then(data => {
            let url = data._links["city:urban_area"].href ? data._links["city:urban_area"].href : new Error("no link to categories")
            return fetch(url + "scores")
        })
        .then(response => response.json())
        .then(data => setCategories(data.categories))
        .catch(e => console.log(e))

    }, [city])
    
    const cityFiveCategories = categories.filter(category => {
       return category.name === "Housing" ||
        category.name === "Cost of Living" ||
        category.name === "Safety" ||
        category.name === "Healthcare" ||
        category.name === "Education"
    })

    console.log(cityFiveCategories);

    return (
        <div className="display">
        {cityFiveCategories.length && cityFiveCategories.map(category => {
            return (
                <div key={category.name}>
                <h5>{category.name}</h5>
                <span>{`${category.score_out_of_10} / 10`}</span>
                </div>
            )
            })}
        </div>
    )

};

export default CityDisplay;