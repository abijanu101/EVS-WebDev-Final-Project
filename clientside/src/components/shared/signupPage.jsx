import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Form, Container, InputGroup, FormControl, Button, FormText, Dropdown } from "react-bootstrap";
import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

export default function SignUpPage() {
    return (
        <>
            <Container fluid style={{ margin: "0px", marginTop: "-24px", padding: "0px" }}>
                <Row>
                    <Col className="col-4 p-5">
                        <br />
                        <h1 className='text-center'>
                            <Link to="/" style={{ textDecoration: "none" }}><FontAwesomeIcon icon={faShirt} /> NetThreads</Link>
                        </h1>
                        <Form className="p-2">
                            <InputGroup className="m-3">
                                <FormControl style={{ marginRight: "1rem" }} type="text" placeholder='Full Name' />
                            </InputGroup>

                            <InputGroup className="m-3">
                                <FormControl style={{ marginRight: "1rem" }} type="text" placeholder='Username' />
                            
                                <FormControl style={{ marginRight: "1rem" }} type="text" placeholder='Phone Number' />
                                <FormText style={{ marginTop: "8px" }}> &nbsp;Gender &nbsp;&nbsp;&nbsp;</FormText>
                                <select className="dropdown">
                                    <option>M</option>
                                    <option>F</option>
                                    <option>Other</option>
                                </select>
                                <Dropdown>
                                </Dropdown>
                            </InputGroup>

                            <InputGroup className="m-3">
                                <FormControl style={{ "marginRight": "1rem" }} type="password" placeholder='Password' />
                            </InputGroup>

                            <InputGroup className="m-3">
                                <FormControl style={{ "marginRight": "1rem" }} type="password" placeholder='Confirm Password' />
                            </InputGroup>

                            <Row style={{ margin: "3rem 2rem" }}>
                                <Col className="col-3">
                                    <Button type="button"> Sign-Up</Button>
                                </Col>
                                <Col>
                                    <p className='text-end' style={{ marginTop: "0.8rem" }}>Already Have an Account? <Link to="/login">Log-in</Link> Now!</p>
                                </Col>
                            </Row>
                        </Form>
                    </Col>

                    <Col style={{ backgroundImage: "url(/bg.png)", height: "1080px" }} className='text-white text-center'>
                        <br />
                        <div className="p-5" style={{ marginTop: "100px" }}>
                            &nbsp;
                            <h3 className='bg-black' style={{ padding: "3rem 0rem" }}>Create an account to purchase items, get discount offers, track your product, and much more! <br /> Already have an account? <Link to="/login">Log-in</Link> Now!</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}