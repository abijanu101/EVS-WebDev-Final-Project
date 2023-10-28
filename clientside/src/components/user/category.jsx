import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Image, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function Category() {
    const params = useParams();
    let reviews = [];
    const [prods, setProds] = useState([]);
    let useEffectDependency = "";

    useEffect(() => {


        async function getProds() {
            fetch(`http://127.0.0.1:4000/products/c/${params.id}`)
                .then(res => res.json())
                .then(data => setProds(data));
        }

        getProds();
    }, [useEffectDependency])

    function getReviews(reviews) {
        let sum = 0;
        for (const i in reviews) {
            sum += Number(reviews[i].stars)
        }

        let average = sum / reviews.length;
        let starString;
        if (average < 1.5)
            starString = [<FontAwesomeIcon icon={faStar} />]
        else if (average < 2.5)
            starString = [<FontAwesomeIcon icon={faStar} />, <FontAwesomeIcon icon={faStar} />]
        else if (average < 3.5)
            starString = [<FontAwesomeIcon icon={faStar} />, <FontAwesomeIcon icon={faStar} />, <FontAwesomeIcon icon={faStar} />]
        else if (average < 4.5)
            starString = [<FontAwesomeIcon icon={faStar} />, <FontAwesomeIcon icon={faStar} />, <FontAwesomeIcon icon={faStar} />, <FontAwesomeIcon icon={faStar} />]
        else
            starString = [<FontAwesomeIcon icon={faStar} />, <FontAwesomeIcon icon={faStar} />, <FontAwesomeIcon icon={faStar} />, <FontAwesomeIcon icon={faStar} />, <FontAwesomeIcon icon={faStar} />]
        return ({ "stars": starString, "reviews": reviews.length });
    }

    useEffectDependency += 1;

    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="col-2">

                    </Col>
                    <Col>
                        <Container fluid>
                            <Row>
                                {prods.map(i => {
                                    return (
                                        <div className="d-flex flex-row" style={{ width: "12rem", padding: "0", margin: "5px 2px" }} >
                                            <Card>
                                                <Link to={`/products/${i._id}`} style={{ color: "black", textDecoration: "none" }}>
                                                    <Card.Header>
                                                        <Image src={i.image} style={{ width: "10rem", height: "10rem", padding: "0px", border: "solid 1px lightgray" }} />
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <p className='display-5' style={{ fontSize: "1.5rem", margin: "0", padding: "0" }}>{i.name}</p>
                                                        <p style={{ fontSize: "0.8rem", margin: "0", padding: "0" }}>RS/ {i.price}</p>

                                                        {
                                                            i.reviews ? <p style={{ color: "orange" }}>{getReviews(i.reviews).stars.map(i => i)} ({getReviews(i.reviews).reviews}) </p> : "No Reviews"
                                                        }
                                                    </Card.Body>
                                                </Link>

                                            </Card>
                                        </div>
                                    )
                                })
                                }
                            </Row>
                        </Container>

                    </Col>
                </Row>


            </Container>
        </>
    )
}