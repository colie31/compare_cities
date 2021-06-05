import React, { useState } from "react";

const CustomInput = ({ searchUrl, setCity }) => {
    const [items, setItems] = useState([]);

    const handleChange = (e) => {
      if (e.target.value === "") {
          return setItems([])
      }
      let encoded = encodeURI(e.target.value.toLowerCase());
      let query = `?search=${encoded}`;
      let url = searchUrl.replace("{?search}", query) + "&limit=5";
      console.log(query);
      console.log("url", url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => setItems(data._embedded["city:search-results"]));
      console.log(items);
    };

    return (
      <>
        <input placeholder="please select a city" onChange={handleChange} />
        <select value={this.state.value} onChange={this.handleChange}>
            {items.map(item => {
                <option value={item}></option>
            })}
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </>
    );
}

export default CustomInput;