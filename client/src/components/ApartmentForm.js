import React, { Component } from "react";

export default class apartmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      number_of_bedrooms: "",
      parking_space: "",
    };
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  //on subit change to add aprtment
  addApartment = () => {
    const { location, number_of_bedrooms, parking_space } = this.state;

    fetch(`/apartments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location,
        number_of_bedrooms,
        parking_space,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.props.onAddApartments();
      });
  };

  render() {
    const { location, number_of_bedrooms, parking_space } = this.state;
    return (
      <form>
        <input
          type="text"
          name="location"
          value={location}
          placeholder="Enter location "
          onChange={this.handleInput}
          className="form-control my-2"
        ></input>
        <input
          type="text"
          name="number_of_bedrooms"
          value={number_of_bedrooms}
          placeholder="Enter number_of_bedrooms"
          onChange={this.handleInput}
          className="form-control my-2"
        ></input>
        <input
          type="text"
          name="parking_space"
          value={parking_space}
          placeholder="select parking spaces "
          onChange={this.handleInput}
          className="form-control my-2"
        ></input>
        <button
          className="form-control btn btn-primary my-2"
          type="submit"
          onClick={this.addApartment}
        >
          Add Apartment
        </button>
      </form>
    );
  }
}
