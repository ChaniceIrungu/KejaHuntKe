import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "../utils/api";
import SearchForm from "./SearchForm";
import ImageToDisplay from "./ImageToDisplay";
import "../App.css";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import CardGroup from "react-bootstrap/CardGroup";
import utils from "./utils";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SearchList(props) {
  const [apartments, setApartments] = useState([]);
  const [description, showDescription] = useState("");
  // The useLocation hook returns the location object that represents the current URL. Like a useState that returns a new location whenever the URL changes.
  const { search } = useLocation();
  const [pic, setPic] = useState("");

  const getApartmentsFiltered = () => {
    api.getApartmentsFiltered(search).then((response) => {
      setApartments(response.data);
    });
  };

  // It's like ComponentDidMount, it accepts a function which can pehuhrform any side effects after every completed render. The second argument is the array of values that the effect depends on.
  useEffect(() => {
    getApartmentsFiltered();
  }, [search]);

  // this doesn't works
  const image = (id) => {
    api.getOneApartmentImages(id).then((response) => {
      setPic(response.data[0].img);
    });
  };

  return (
    <div>
      <div className="container d-flex ">
        <div className="">
          <SearchForm className="w-50" />
        </div>
        <div className="">
          {" "}
          <div>
            {!apartments?.length ? (
              <div>
                <i className="fas fa-exclamation-triangle text-light fa-5x my-4"></i>
                <div className="alert alert-light my-4" role="alert">
                  {`Sorry, there are no apartments to show!`}
                </div>
              </div>
            ) : (
              <div>
                <ul className="row row-cols-2">
                  {apartments.map((apartment) => (
                    <div
                      key={apartment.id}
                      className="list-group-item justify-content-between"
                    >
                      <NavLink to={`/apartments/${apartment.id}`}>
                        <CardGroup className="">
                          <Card style={{ width: "30rem" }}>
                            <Card.Img
                              style={{
                                width: "100%",
                                height: "20vw",
                                objectFit: "cover",
                              }}
                              variant="top"
                              src="/house3.jpg"
                              alt="apartment"
                            />
                            <Card.Body>
                              <Card.Title>
                                <strong>{apartment.location}</strong>
                              </Card.Title>
                              {/* {showDescription ? (
                                <Card.Text>{apartment.description}</Card.Text>
                              ) : null} */}
                              <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                  <strong> Rent/Month:</strong>{" "}
                                  {utils.formatCurrency(
                                    apartment.monthlyRent || 0
                                  )}
                                </ListGroupItem>
                                <ListGroupItem>
                                  <strong>Bedrooms:</strong>{" "}
                                  {apartment.numBedrooms}
                                </ListGroupItem>
                                <ListGroupItem>
                                  <strong>Bathrooms:</strong>{" "}
                                  {apartment.numBathrooms}
                                </ListGroupItem>
                                <ListGroupItem>
                                  <strong>Parking Space:</strong>{" "}
                                  {apartment.numParking}
                                </ListGroupItem>
                              </ListGroup>
                            </Card.Body>
                          </Card>
                        </CardGroup>
                      </NavLink>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
