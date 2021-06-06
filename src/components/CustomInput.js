import React, { useState } from "react";

const CustomInput = ({ searchUrl, setCity }) => {
    const [options, setOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")

    const handleChange = (e) => {
        if(e.target.value === "") {
            setSearchTerm("")
            return setOptions([])
        }

        setSearchTerm(e.target.value);
        let encoded = encodeURI(searchTerm.toLowerCase());
        let query = `?search=${encoded}`
        let url = searchUrl.replace("{?search}", query) + "&limit=5";
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
              setOptions(data._embedded["city:search-results"])
          });
    };

    const handleClick = (e) => {
        setSearchTerm(e.target.innerHTML)
        setOptions([])
         
        fetch(e.target.value)
        .then((response) => response.json())
        .then((data) => {
            setCity({
                name: data.name,
            })
            let cityScoreInfo = data._links["city:urban_area"]
            if(!cityScoreInfo) throw Error("No Data Available")
            return fetch(cityScoreInfo.href + "scores");
        })
        .then((response) => response.json())
        .then((data) => setCity(prev => {
            return {
            ...prev,
            score: data.categories
            }
        }))
        .catch((error) => {
            setCity(prev => {
                return {
                    ...prev,
                    error: error.message
                }
            })
            console.log(error);
        });
        
    }
    
    return (
        <div>
            <div>
                <input 
                placeholder="provide a city"
                value={searchTerm}
                onChange={handleChange}
                />
            </div>
            <div className="options">
            {options.map(option => {
                return (
                    <div key={option.matching_full_name}>
                    <option 
                    onClick={handleClick}
                    value={option._links["city:item"].href}
                    >{option.matching_full_name}</option>
                    </div>
                    )
                })}
            </div>
        </div>
            );
        }
        
export default CustomInput;
        