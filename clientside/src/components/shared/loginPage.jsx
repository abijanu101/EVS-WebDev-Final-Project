import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Form, Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { useState } from 'react';
import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

let name = "", password = "";

export default function LoginPage() {

    const [text, setText] = useState("");

    async function onLoginPress() {
        const reqBody = JSON.stringify({
            "username": name,
            "password": password
        });

        fetch("http://127.0.0.1:4000/users/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: reqBody
            })
            .then(response => {
                console.log(response);
                if (response.ok) {
                    window.location.href = "/";
                    response.json()
                        .then((responseJSON) => {
                            if (responseJSON.success) localStorage.setItem("token", responseJSON.token);
                        });
                }
                else 
                    response.json().then((responseJSON) => setText(responseJSON.msg));
            })

    }

    function handleUsernameUpdate(e) {
        name = e.target.value;
    }

    function handlePasswordUpdate(e) {
        password = e.target.value;
    }

    return (
        <>
            <Container fluid style={{ margin: "0px", marginTop: "-24px", padding: "0px" }}>
                <Row>
                    <Col style={{ backgroundImage: "url(/bg.png)", height: "1080px" }} className='text-white text-center'>
                        <br />
                        <div className="p-5" style={{ marginTop: "100px" }}>
                            &nbsp;
                            <h3 className='bg-black' style={{ padding: "3rem 0rem" }}>Log-In to your NetThreads Account to get your hands on the latest new fits! <br />Don't have an account? <Link to="/signup">Sign Up</Link> Today</h3>
                        </div>
                    </Col>
                    <Col className="col-4 p-5">
                        <br />
                        <h1 className='text-center'>
                            <Link to="/" style={{ textDecoration: "none" }}><FontAwesomeIcon icon={faShirt} /> NetThreads</Link>
                        </h1>
                        <br />
                        <Form className="p-2">
                            <br />
                            <InputGroup className="m-2">
                                <FormControl onChange={handleUsernameUpdate} style={{ marginRight: "1rem" }} type="text" placeholder='Enter a Username' />
                            </InputGroup>
                            <br />
                            <InputGroup className="m-2">
                                <FormControl onChange={handlePasswordUpdate} style={{ "marginRight": "1rem" }} type="password" placeholder='Enter Your Password' />
                            </InputGroup>
                            <p style={{ marginTop: "2rem" }}>{text}</p>
                            <Row style={{ margin: "3rem 2rem" }}>
                                <Col>
                                    <Button type="button" onClick={onLoginPress}> Log-In</Button>
                                </Col>
                                <Col>
                                    <p className='text-end' style={{ marginTop: "0.8rem" }}>Forgot Password?</p>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}