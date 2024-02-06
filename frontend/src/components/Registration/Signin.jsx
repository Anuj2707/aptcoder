import React, { useState } from "react"
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../Store";
import { useDispatch } from "react-redux";
import signup from "../../assets/signup.png"
import "./Signin.css"

function Signin() {

    const HOST = "http://localhost:9134";

    const dispatch = useDispatch();

    const history = useNavigate();

    const [Inputs, setInputs] = useState({
        email: "",
        password: ""
    });


    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value })
    };



    const submit = async (e) => {
        e.preventDefault();
        try {
            // If all validations pass, proceed with the API call
            const response = await axios.post(`${HOST}/api/v1/signin`, Inputs);
            toast.success("Login successful!");
            sessionStorage.setItem("id", response.data.others._id);
            dispatch(authActions.login());
            history("/");
            window.location.reload();
        } catch (error) {
            toast.error('Please enter a valid email & password');
            console.error("Axios Error on sign-in:", error);
        }
    };



    return (
        <div className="signin">
            <Container>
                <ToastContainer autoClose={2500} />
                <Row className="form-wrapper">
                    <Col xs={12} md={6}>
                        <Form className="d-flex flex-column justify-content-center h-100 gap-3 custom-form-style">
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" value={Inputs.email} type="email" placeholder="Enter email" onChange={change} />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" value={Inputs.password} type="password" placeholder="Enter password" onChange={change} />
                            </Form.Group>

                            <Button className="p-2" variant="primary" type="submit" onClick={submit} >
                                Sign In
                            </Button>
                        </Form>
                    </Col>

                    <Col xs={12} md={5}>
                        <img
                            src={signup}
                            alt="Signin Image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Signin;