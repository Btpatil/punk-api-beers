import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [beers, setBeers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((response) => response.json())
      .then((data) =>
        setBeers(
          data.filter((beer) => {
            return beer.name.toLowerCase().includes(searchQuery.toLowerCase());
          }),
        ),
      );
  }, []);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const hancleSeach = () => {
    const searchResult = fetch("https://api.punkapi.com/v2/beers")
      .then((response) => response.json())
      .then((data) =>
        setBeers(
          data.filter((beer) => {
            return beer.name.toLowerCase().includes(searchQuery.toLowerCase());
          }),
        ),
      );
  };

  return (
    <div className="App">
      <h1>Punk API Beers</h1>

      <div className="row">
        <input
          type="text"
          placeholder="Search beer..."
          onChange={handleChange}
          className="search"
        />
        <button className="searchBtn" onClick={hancleSeach}>
          Seach
        </button>
      </div>

      {beers.length == 0 ? (
        <div className="">
          <p>No beers that contains letters "{searchQuery}" in it :(</p>
        </div>
      ) : (
        <>
          <div className="grid-container">
            {beers.map((beer) => (
              <div className="beer-card" key={beer.id}>
                <h2>{beer.name}</h2>
                <img src={beer.image_url} alt={beer.name} />
                <p>{beer.description}</p>
                <p>ABV: {beer.abv}%</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
