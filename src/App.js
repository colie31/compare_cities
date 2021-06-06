import React, { useEffect, useState } from "react"
import './App.css';
//components
import CustomInput from "./components/CustomInput"
import CityDisplay from "./components/CityDisplay"

function App() {
  const [searchUrl, setSearchUrl] = useState("");

  const [city1, setCityOneHref] = useState("");
  const [city2, setCityTwoHref] = useState("");


  useEffect(() => {
    fetch("https://api.teleport.org/api/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Content not found")
        }
      })
      .then((data) => {
        let links = data._links
        setSearchUrl(links["city:search"].href)
      })
      .catch((error) => console.log(error));
  },[]);

  if(!searchUrl) return null;

  return (
    <div className="App">
      <div>
        <header>Please select two urban areas to compare data:</header>
        <div className="form-container">
          <form className="form">
            <CustomInput searchUrl={searchUrl} setCity={setCityOneHref} />
            <span> and </span>
            <CustomInput searchUrl={searchUrl} setCity={setCityTwoHref} />
          </form>
        </div>
        <div className="display-container">
          <div className="display">{city1 && <CityDisplay city={city1} />}</div>
          <div className="display">{city2 && <CityDisplay city={city2} />}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
