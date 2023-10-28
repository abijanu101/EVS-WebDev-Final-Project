import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Form, Dropdown, NavItem, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function PageLayout() {
    const [tlcs, setTLCs] = useState([]);

    useEffect(() => {
        async function getTLCs() {
            fetch("http://127.0.0.1:4000/categories/toplevel")
                .then(res => res.json())
                .then(data => setTLCs(data));
        }

        getTLCs();
    });

    return (
        <>
            <Container fluid>
                <Row className="bg-primary text-white p-2" >
                    <Col className="col-7">
                        <Link to="/"><h2 className="text-white"><FontAwesomeIcon icon={faShirt} /> NetThreads</h2></Link>
                    </Col>

                    <Col className='mt-1'>
                        <Row>
                            <Col>
                                <Form.Control className='bg-white text-black' type="text" placeholder='Search for a Product' />
                            </Col>
                            <Col className="col-1">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: "130%", margin: "-7px -10px", color: "white" }} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='border shadow p-2 display-6' style={{ fontSize: "20px" }}>
                    <Col className=' col-2'><Link to="/" style={{ color: "black", textDecoration: "none" }}>Home</Link></Col>
                    <Col className=' col-4 nav-item'>
                        <Dropdown as={NavItem}>
                            <Dropdown.Toggle as={NavLink}>Categories</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {tlcs.map(i => <Dropdown.Item><Link style={{ color: "black", textDecoration: "none" }} to={"/categories/" + i._id}>{i.name}</Link></Dropdown.Item>)}
                                <hr style={{margin: "0px", marginBottom: "2px" }} />
                                <Dropdown.Item><Link style={{ color: "black", textDecoration: "none" }} to="categories/">See all Categories...</Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col className=' offset-5' style={{ textAlign: "right" }}><Link to="/admin" style={{ color: "black", textDecoration: "none" }}>Admin</Link></Col>
                </Row>
                <br></br>
                <Outlet />
            </Container>
        </>
    );
}