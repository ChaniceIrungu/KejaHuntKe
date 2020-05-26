import React, { useState } from "react";
//https://reacttraining.com/react-router/web/api/Hooks/usehistory
import { useHistory } from "react-router-dom";
export default function SearchForm() {
  let history = useHistory();
  const [place, setPlace] = useState("");
  const performSearch = () => {
    history.push(`/search?place=${place}`);
  };
  const handleChange = (e) => {
    setPlace(e.target.value);
  };
  return (
    <div>
      <div class="card">
        <img
          src="PhoneSearch.jpg"
          class="card-img-top w3-round"
          alt="house hunting"
        />
        <div class="card-body">
          <h5 class="card-title">Find A house</h5>
          <p class="card-text">
            Pick a city and find your ideal house by the click of a button.{" "}
          </p>
          <input
            name="search"
            value={place}
            onChange={handleChange}
            className="form-control"
          />
          <button onClick={performSearch} class="btn btn-primary">
            Search Now
          </button>
        </div>
      </div>
    </div>
  );
}
