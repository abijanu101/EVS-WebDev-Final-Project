import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Card, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import winter from '../../winterSale.png';
import gloves from '../../gloves.png';
import suits from '../../suits.png';
import scarves from '../../scarves.png';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';



export default function HomePage() {

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



    const [popularCat, setPopularCat] = useState([]);
    useEffect(() => {

        async function getPopularProds() {
            let res = await fetch(`http://127.0.0.1:4000/products/`);
            let prods = await res.json();

            for (let i = 0; i < prods.length - 1; i++)
                for (let j = 0; j < prods.length - i - 1; j++)
                    if (prods.reviews) {
                        if (prods[j].reviews.length < prods[j + 1].reviews.length) {
                            const temp = prods[j];
                            prods[j] = prods[j + 1];
                            prods[j + 1] = temp;
                        }
                    }
                    else {
                        let temp = prods[j];
                        prods[j] = prods[j + 1];
                        prods[j + 1] = temp;
                    }

            setPopularCat(prods.slice(0, 6));
        }

        getPopularProds();
    }, []);

    return (
        <>
            <Container fluid style={{ margin: "0px", padding: "0px" }}>
                <Carousel style={{ width: "105%", marginTop: "-24px", marginLeft: "-2%", padding: "0px" }} >
                    <Carousel.Item>
                        <img alt="" src={winter} style={{ width: "100%", marginTop: "-24px", marginLeft: "-2%", padding: "0px" }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img alt="" src={scarves} style={{ width: "100%", marginTop: "-24px", marginLeft: "-2%", padding: "0px" }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img alt="" src={suits} style={{ width: "100%", marginTop: "-24px", marginLeft: "-2%", padding: "0px" }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img alt="" src={gloves} style={{ width: "100%", marginTop: "-24px", marginLeft: "-2%", padding: "0px" }} />
                    </Carousel.Item>
                </Carousel>

                <br />
                <h2>Popular</h2>
                <Row>
                    <Col className="offset-1 col-10">
                        <Row>
                            {popularCat.map(i => {
                                return (
                                    <div className="d-flex flex-row" style={{ width: "15.5rem", padding: "0", margin: "5px 2px" }} >
                                        <Card>
                                            <Link to={`/products/${i._id}`} style={{ color: "black", textDecoration: "none" }}>
                                                <Card.Header>
                                                    <Image src={i.image} style={{ width: "13.5rem", height: "13.5rem", padding: "0px", border: "solid 1px lightgray" }} />
                                                </Card.Header>
                                                <Card.Body>
                                                    <p className='display-5' style={{ fontSize: "1.5rem", margin: "0", padding: "0" }}>{i.name}</p>
                                                    <p style={{ fontSize: "0.8rem", margin: "0", padding: "0" }}>RS/ {convPriceToStr(i.price)}</p>
                                                    {
                                                        i.reviews ? <p style={{ color: "orange" }}>{getReviews(i.reviews).stars.map(i => i)} ({getReviews(i.reviews).reviews}) </p> : "No Reviews"
                                                    }
                                                </Card.Body>
                                            </Link>
                                        </Card>
                                    </div>
                                )
                            })}
                        </Row>


                    </Col>
                </Row>

            </Container>
        </>
    );
}