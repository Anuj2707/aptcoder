import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

import signup from '../../assets/signup.png';

const Signup = () => {

    const HOST = "http://localhost:9134";

    const history = useNavigate();

    const [Inputs, setInputs] = useState({
        email: '',
        username: '',
        password: '',
    });

    const validateEmail = (email) => {
        // Regular expression for a valid email address
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateUsername = (username) => {
        // Regular expression for a valid username (allowing only alphanumeric characters and at least 5 characters)
        const regex = /^[a-zA-Z0-9]{5,}$/;
        return regex.test(username);
    };

    const validatePassword = (password) => {
        // Regular expression for a valid password (at least 8 characters, one uppercase letter, one special character)
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
        return regex.test(password);
    };


    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        const { email, username, password } = Inputs;

        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        if (!validateUsername(username)) {
            toast.error('Username must be at least 5 characters and can only contain alphanumeric characters');
            return;
        }

        if (!validatePassword(password)) {
            toast.error('Password must be at least 8 characters long, contain at least one uppercase letter, and at least one special character.');
            return;
        }

        try {
            const response = await axios.post(`${HOST}/api/v1/register`, Inputs);
            if (response.data.message === 'User with this email or username already exists') {
                toast.error('User with this email or username already exists!');
            }
            if (response.data.message === 'Sign Up successfull') {
                toast.success('Sign Up successful');
                setInputs({
                    email: '',
                    username: '',
                    password: '',
                });
                history('/signin');
            }
        } catch (error) {
            console.error('Axios Error:', error);
        }
    };

    return (
        <div className="signup">
            <Container>
                <ToastContainer autoClose={2500} />
                <Row className="form-wrapper">
                    <Col xs={12} md={6}>
                        <Form className='d-flex flex-column justify-content-center h-100 gap-3 custom-form-style'>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={change} value={Inputs.email} type="email" placeholder="Enter email" name="email" />
                            </Form.Group>

                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={change} value={Inputs.username} type="text" placeholder="Enter username" name="username" />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={change} value={Inputs.password} type="password" placeholder="Enter password" name="password" />
                            </Form.Group>

                            <Button className='p-2' variant="primary" type="submit" onClick={submit}>
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                    <Col xs={12} md={5}>
                        <img
                            src={signup}
                            alt="Signup Image"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signup;
