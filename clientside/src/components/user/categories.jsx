import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, ListGroupItem, ListGroup } from "react-bootstrap";
import { Link} from "react-router-dom";
import { useEffect, useState } from 'react';

export default function Categories() {
    const [array, setArray] = useState([]);

    useEffect(() => {
        async function getCats() {
            fetch("http://127.0.0.1:4000/categories/")
                .then(res => res.json())
                .then(data => setArray(data));
        }
        getCats();
    }, []);

    return (
        <>
            <Container fluid>
                <ListGroup>
                    <ListGroupItem style={{ padding: "1rem", textAlign: "center" }} className="bg-primary text-white display-5">All Categories</ListGroupItem>
                    <ListGroupItem style={{ padding: "0" }} className="bg-primary text-white display-5">
                        <Container fluid>
                            <Row>
                                <Col className='col py-2 border'>
                                    <p>Name</p>
                                </Col>
                                <Col className='col-4 py-2 border'>
                                    <p>Parent</p>
                                </Col>
                            </Row>
                        </Container>
                    </ListGroupItem>
                    {array.map(i => {
                        return (
                            <ListGroupItem style={{ padding: "0" }}>
                                <Container fluid>
                                    <Row>
                                        <Col className='col py-2 border'>
                                            <Link to={`${i._id}`}>{i.name}</Link>
                                        </Col>
                                        <Col className='col-4 py-2 border'>
                                            {(i.parent)
                                                ? (<Link style={{ padding: "2px", margin: "2px" }} to={`${i.parent}`}>{array.find(c => c._id === i.parent).name}</Link>)
                                                : <p style={{ padding: "2px", margin: "2px" }} >None</p>
                                            }
                                        </Col>
                                    </Row>
                                </Container>
                            </ListGroupItem>
                        );
                    })}

                </ListGroup>
            </Container>
        </>
    )
}