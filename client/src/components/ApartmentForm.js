import React, { Component } from "react";

export default class apartmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
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
    const {
      image,
      location,
      number_of_bedrooms,
      parking_space,
      monthly_rent,
    } = this.state;

    fetch(`/apartments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image,
        location,
        number_of_bedrooms,
        parking_space,
        monthly_rent,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.props.onAddApartment(response);
      });
  };

  render() {
    const {
      image,
      location,
      number_of_bedrooms,
      parking_space,
      monthly_rent,
    } = this.state;
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
          placeholder="parking spaces "
          onChange={this.handleInput}
          className="form-control my-2"
        ></input>
        <input
          type="number"
          name="monthly_rent"
          value={monthly_rent}
          placeholder="monthly_rent "
          onChange={this.handleInput}
          className="form-control my-2"
        ></input>
        <input
          type="text"
          name="image"
          value={image}
          placeholder="image "
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
