import React, { Component } from "react";
import ApartmentForm from "./components/ApartmentForm";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
  onAddApartment() {
    this.getAllApartments();
  }

  render() {
    const { apartments } = this.state;

    return (
      <Router>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            React example
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <link to="/ApartmentForm" className="nav-link">
                  ApartmentForm
                </link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container pt-4">
          <div className="my-4">
            <h1>House Hunting Kenya</h1>
            <h3>Keja Hunting made Easier!!</h3>
            <switch>
              <Route Path="/ApartmentForm">
                <ApartmentForm onAdd={this.onAddApartment} />
              </Route>
            </switch>
          </div>

          <div>
            <ul className="my-3 list-group text-black">
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
      </Router>
    );
  }
}

export default App;
