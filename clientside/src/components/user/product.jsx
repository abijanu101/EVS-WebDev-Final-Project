import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function Product() {
    const params = useParams();
    const [prod, setProd] = useState([]);
    let useEffectDependency = "";

    useEffect(() => {
        async function getProd() {
            fetch(`http://127.0.0.1:4000/products/${params.id}`)
                .then(res => res.json())
                .then(data => setProd(data));
        }
        getProd();
    }, [useEffectDependency])

    function convPriceToStr(num) {
        let length = 1;

        for (; Math.floor(Number(num) / (10 ** length)); length++)
            ;

        let string = "";
        let commaStart = length % 3;
        commaStart = commaStart == 0 ? 3 : commaStart;

        for (let i = 1; i <= length; i++)
        {
            string += Math.floor(Number(num) / (10 ** (length - i))) % 10;
            if (i == commaStart && i != length)
            {
                string += ',' 
                commaStart += 3;
            }
        }

        return string;
    }

    function getReviews(reviews) {
        let sum = 0;
        for (const i in reviews) {
            sum += Number(reviews[i].stars)
        }

        let average = sum / reviews.length;
        return getStarsFromInt(average)
    }

    function getStarsFromInt(average) {
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
        return ({ "stars": starString });
    }

    useEffectDependency += 1;
    return (
        <>
            <Container fluid style={{ padding: "0px 2rem" }}>
                <Row>
                    <Col className="col-5 p-2" >
                        <div className='border w-100' style={{ margin: "2px", padding: "50px" }}>
                            <image src={prod.image} className='w-100' alt={prod.image} />
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <h2 className='display-5' style={{ fontWeight: "bold" }} >{prod.name}</h2>
                            <p className='display-6 text-success fs-4' >PKR/ {convPriceToStr(prod.price)}</p>
                            <p>{prod.reviews ? <span style={{ color: "orange" }}>{getReviews(prod.reviews).stars} ({prod.reviews.length})</span> : "No Reviews"}</p>
                        </div>
                        <hr />
                        <div>
                            {prod.details}
                        </div>
                    </Col>
                </Row>
                <ListGroup style={{marginTop: "5rem"}} className='border'>
                    {prod.reviews ?
                        (prod.reviews.map(r => {
                            return (
                                <ListGroupItem>
                                    <p style={{marginBottom:"0"}}>User{r.userId}</p>
                                    <p style={{color: "orange", marginTop: "0px"}}>{getStarsFromInt(r.stars).stars.map(i => i)}</p>
                                    <p>{r.remarks ? r.remarks : ""} </p>
                                </ListGroupItem>
                            )
                        }))
                        : "No Reviews Yet"
                    }
                </ListGroup>
            </Container>
        </>
    )
}