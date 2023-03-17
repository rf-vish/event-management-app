import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { registerUser } from "../api/user.js";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context.js";

function SignUp() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      try {
        const newUser = await registerUser(formData);
        console.log(newUser);

        setErrorMessage("");

        setFormData({
          username: "",
          email: "",
          password: "",
        });

        // Set auth state since the user has successfully signed up
        authCtx.onLogin(newUser.data.token);

        setValidated(false);

        navigate("/");
      } catch (error) {
        console.log("Request error:", error.message);
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <Form.Group controlId="formName" className="my-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={inputChangeHandler}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={inputChangeHandler}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={inputChangeHandler}
                minLength={6}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password must be at least 6 characters.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
