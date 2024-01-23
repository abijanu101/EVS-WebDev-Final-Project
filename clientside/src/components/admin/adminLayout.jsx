import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Container, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="col-3">
                        <Card>
                            <Card.Header className="bg-secondary">
                                <Link to="/admin" style={{ textDecoration: "none" }}>
                                    <h3 className="text-white"><FontAwesomeIcon icon={faScrewdriverWrench} />&nbsp; Admin Panel</h3>
                                </Link>
                            </Card.Header>

                            <ListGroup>
                                <ListGroupItem><Link to="/admin/categories"> Manage Categories</Link></ListGroupItem>
                                <ListGroupItem>Manage Products</ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>

                    <Col>
                        <Outlet />
                    </Col>
                </Row>

            </Container >
        </>
    );
}