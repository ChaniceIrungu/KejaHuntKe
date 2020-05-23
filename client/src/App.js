import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      number_of_bedrooms: "",
      parking_space: "",

      apartment: [],
    };
  }

  componentDidMount() {
    this.getAllApartments();
  }

  getAllApartments = () => {
    fetch(`/apartments`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ apartments: response });
      });
  };
  addApartment = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    let apartment = {
      location: this.state.location,
      number_of_bedrooms: this.state.number_of_bedrooms,
      parking_space: this.state.parking_space,
    };
    fetch(`/apartments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apartment),
    })
      .then((response) => response.json())
      .then((json) => this.setState({ apartments: json }));
  };

  deleteItem(id) {
    fetch(`/apartments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ apartments: json });
      });
  }

  render() {
    const {
      location,
      number_of_bedrooms,
      parking_space,
      apartment,
    } = this.state;

    return (
      <div className="container">
        <div className="App">
          <div className="my-4">
            <h1>House Hunting Nairobi</h1>
            <h3>Keja Hunting made Easier!!</h3>
          </div>
          <form
            className="apartment
_input"
            onSubmit={(e) => this.onSubmit(e)}
          >
            <input
              type="text"
              name="location"
              value="location"
              placeholder="Enter location "
              onChange={(e) => this.addApartment(e)}
              className="form-control my-2"
            ></input>
            <input
              type="text"
              name="number_of_bedrooms"
              value="number_of_bedrooms"
              placeholder="Enter number_of_bedrooms"
              onChange={(e) => this.addApartment(e)}
              className="form-control my-2"
            ></input>
            <input
              type="text"
              name="parking_space"
              value="parking_space"
              placeholder="select parking spaces "
              onChange={(e) => this.addApartment(e)}
              className="form-control my-2"
            ></input>
            <button
              className="form-control btn btn-outline-dark my-2"
              type="submit"
            >
              SUBMIT
            </button>
          </form>

          <ul className="my-3 list-group" className="text-black">
            {apartments.map((apartment) => (
              <li className=" list-group-item d-flex justify-content-between">
                <span>
                  {apartment.location} {apartment.number_of_bedrooms}
                  {apartment.parking_space}>
                </span>
                <button
                  onClick={() => this.deleteItem(apartment.id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  DELETE{" "}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
