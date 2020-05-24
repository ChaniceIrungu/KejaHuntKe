import React, { Component } from "react";
import ApartmentForm from "./components/ApartmentForm";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      number_of_bedrooms: "",
      parking_space: "",

      apartments: [],
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

  deleteItem(id) {
    fetch(`/apartments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(this.getAllApartments);
  }
  onAddApartment = () => {
    this.getAllApartments;
  };

  render() {
    const { apartments } = this.state;

    return (
      <div className="container">
        <div className="App">
          <div className="my-4">
            <h1>House Hunting Nairobi</h1>
            <h3>Keja Hunting made Easier!!</h3>
            <ApartmentForm onAddApartment={this.onAddApartment} />
          </div>

          <div>
            <ul className="my-3 list-group" className="text-black">
              {apartments.map((apartment) => (
                <li
                  key={apartment.id}
                  className=" list-group-item d-flex justify-content-between"
                >
                  <span>
                    {apartment.location} {apartment.number_of_bedrooms}
                    {apartment.parking_space}
                  </span>
                  <button
                    onClick={() => this.deleteItem(apartment.id)}
                    className="btn btn-danger"
                  >
                    DELETE
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
