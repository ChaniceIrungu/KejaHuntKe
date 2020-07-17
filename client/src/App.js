import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import api from "./utils/api";
import "./App.css";
import SearchList from "./components/SearchList";
import ApartmentForm from "./components/ApartmentForm";
import ApartmentDisplay from "./components/ApartamentDisplay";
import ListAll from "./components/ListAll";
import Register from "./components/Register";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apartments: [],
    };
  }
  getApartmentsFiltered() {
    api.getApartmentsFiltered().then((response) => {
      this.setState({ apartments: response.data });
    });
  }

  deleteItem(id) {
    api.deleteItem(id).then((response) => {
      this.getApartmentsFiltered();
    });
  }

  render() {
    return (
      <Router>
        <Navbar
          collapseOnSelect
          expand="md"
          bg="dark"
          variant="dark"
          sticky="top"
        >
          <Navbar.Brand as={NavLink} to="/">
            Keja Hunt KE
            <img height="30" className="d-inline-block align" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto align-items-center">
              <Nav.Link as={NavLink} to="/Search">
                Search apartments
              </Nav.Link>

              <Nav.Link as={NavLink} to="/all">
                All the apartments
              </Nav.Link>

              <Nav.Link as={NavLink} to="/create">
                List your apartment
              </Nav.Link>
            </Nav>

            <Nav.Link as={NavLink} to="/login">
              <Form inline>
                <Button variant="dark">Login</Button>
              </Form>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Register">
              Register
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <div className="main-container d-flex flex-column justify-content-center align-items-center">
          <h1 className="title1 my-2">House hunting made easier!!</h1>​
          <Switch>
            <Route path="/create">
              <ApartmentForm onAddApartment={this.onAddApartment} />
            </Route>
            <Route path="/all">
              <ListAll />
            </Route>
            <Route path="/apartments/:id" component={ApartmentDisplay}>
              <ApartmentDisplay apartments={this.state.apartments} />
            </Route>
            <Route path="/search">
              <SearchList />
            </Route>
            <Route path="/Register">
              <Register />
            </Route>
            <Route path="/">
              <div>
                <h2 className="title2">Let us Guide you Home</h2>
                <h3 className="title3">Keja Hunt KE</h3>
                <Carousel ClassName="container ms-4">
                  <Carousel.Item ClassName="container my-4">
                    <img
                      className=" carousel d-block w-100"
                      src="/house1.jpg"
                      Width="50"
                      alt="Made in Kenya"
                      data-interval="7000"
                    />
                  </Carousel.Item>
                  <Carousel.Item ClassName="container my-4">
                    <img
                      className=" carousel slide d-inline-block"
                      style={{
                        width: "100%",
                        height: "100vw",
                        objectFit: "cover",
                      }}
                      src="/house2.jpg"
                      text="First slide&bg=282c34"
                      alt="Kisumu"
                      data-interval="7000"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className=" carousel d-block w-100"
                      src="/house3.jpg"
                      width="100"
                      text="First slide&bg=282c34"
                      alt="Nairobi"
                      data-interval="7000"
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
