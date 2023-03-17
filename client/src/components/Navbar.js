import React, { useContext, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

function NavigationBar() {
  const authCtx = useContext(AuthContext);

  const logoutHandler = (event) => {
    authCtx.onLogout();
  };

  return (
    <Navbar bg="light" expand="lg" className="justify-content-between p-3">
      <Navbar.Brand href="/" className="ms-2">
        Event Management App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link href="/" className="ms-5 me-5">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/events" className="ms-5 me-5">
            All Events
          </Nav.Link>
          <Nav.Link href="#link" className="ms-5 me-5">
            Create Event
          </Nav.Link>
        </Nav>
        {!authCtx.isLoggedIn && (
          <div>
            <Button
              as={Link}
              to="/login"
              variant="outline-success"
              className="me-3"
            >
              Log In
            </Button>

            <Button
              as={Link}
              to="/signup"
              variant="outline-primary"
              className="me-4"
            >
              Sign Up
            </Button>
          </div>
        )}
        {authCtx.isLoggedIn && (
          <div>
            <Button
              as={Link}
              to="/"
              variant="outline-primary"
              className="me-4"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
