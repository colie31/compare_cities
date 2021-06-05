import React, { useEffect, useState } from "react"
import './App.css';
//components
import CustomInput from "./components/CustomInput"

function App() {
  const [searchUrl, setSearchUrl] = useState("");
  const [cityUrl, setCityUrl] = useState("");

  const [city1, setCity1] = useState([]);
  const [city2, setCity2] = useState([]);

  // const [items1, setItems1] = useState([]);
  // const [items2, setItems2] = useState([]);

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
        console.log(links);
        setSearchUrl(links["city:search"].href);
        setCityUrl(links["city:by-id"].href);
      })
      .catch((error) => console.log(error));
  },[]);

  if(!cityUrl || !searchUrl) return null;

  // const handleChange = (e, setter) => {
  //   if(e.target.value === "") return
  //   let encoded = encodeURI(e.target.value.toLowerCase()); 
  //   let query = `?search=${encoded}`
  //   let url = searchUrl.replace("{?search}", query) + "&limit=5";
  //   console.log(query);
  //   console.log("url", url)
  //   fetch(url)
  //   .then(response => response.json())
  //   .then(data => setter(data._embedded["city:search-results"]))
  //   console.log(items1)
  // };

  const handleSubmit = (item) => {
    console.log(item);
  };

  console.log(cityUrl);
  console.log(searchUrl);

  return (
    <div className="App">
      <div>
        <header>Please select two urban areas to compare data:</header>
        <div className="form-container">
          <form className="from" onSubmit={handleSubmit}>
            <CustomInput searchUrl={searchUrl} setCity={setCity1} />
            <span> and </span>
            <CustomInput searchUrl={searchUrl} setCity={setCity2} />
            <button type="submit">Compare Cities</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
