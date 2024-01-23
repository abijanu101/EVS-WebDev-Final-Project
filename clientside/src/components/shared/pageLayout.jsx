import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Form, Dropdown, NavItem, NavLink, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from 'react';



export default function PageLayout() {
    const [username, setUsername] = useState("N / A");
    const [tlcs, setTLCs] = useState([]);

    useEffect(() => {
        async function getTLCs() {
            fetch("http://127.0.0.1:4000/categories/toplevel")
                .then(res => res.json())
                .then(data => setTLCs(data));
        }

        getTLCs();
    }, []);

    function isLoggedIn() {
        const token = localStorage.getItem("token");
        if (!token)
            return false;

        let output = false;
        fetch("http://127.0.0.1:4000/users/isLoggedIn", {
            method: "GET",
            headers: {
                "X-Auth-Token": token
            }
        })
            .then(response => {
                if (response.ok)
                    response.json().then((responseJSON => output = responseJSON.success));
            });

        return true;
    }

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    function showUsername() {
        const token = localStorage.getItem("token");

        fetch("http://127.0.0.1:4000/users/getUsername", {
            method: "GET",
            headers: {
                "X-Auth-Token": token
            }
        })
            .then(response => {
                if (response.ok)
                    response.json()
                        .then(responseJSON => setUsername(responseJSON.success ? responseJSON.username : "N / A"));
            });
        return (
            <>
                <Dropdown as={NavItem}>
                    <Dropdown.Toggle style={{ "textAlign": "right" }} as={NavLink}>{username}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={logout} >Log-out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </>
        );
    }

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
                            <Col className='col-2 p-0'>
                                {
                                    isLoggedIn() ? showUsername() :
                                        <Button type="button" className="button text-primary bg-white"><Link to="/login" style={{ "text-decoration": "none" }}>Log-In</Link></Button>
                                }
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
                                {tlcs.map(i => <Dropdown.Item>
                                    <Link style={{ color: "black", textDecoration: "none" }} to={"/categories/" + i._id}>{i.name}</Link>
                                </Dropdown.Item>)}
                                <hr style={{ margin: "0px", marginBottom: "2px" }} />
                                <Dropdown.Item><Link style={{ color: "black", textDecoration: "none" }} to="categories/">See all Categories...</Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    {isLoggedIn() ?
                        <Col className=' offset-5' style={{ textAlign: "right" }}><Link to="/admin" style={{ color: "black", textDecoration: "none" }}>Admin</Link></Col>
                        : ""}
                </Row>
                <br></br>
                <Outlet />
            </Container>
        </>
    );
}