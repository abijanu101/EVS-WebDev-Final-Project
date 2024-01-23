import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Card, Col, Container, Form, Row, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function CategoriesPage() {
  const [array, setArray] = useState([]);
  const [mutedText, setMutedText] = useState("");
  const [submissionText, setSubmissionText] = useState("");
  let name = "";
  let parent = "";
  let useEffectDependency = 0;

  useEffect(() => {
    console.log("Running")
    async function getCats() {
      fetch("http://127.0.0.1:4000/categories/")
        .then(res => res.json())
        .then(data => setArray(data));
    }

    getCats();
  }, [useEffectDependency])


  async function editCategory(e) {
    let test = (await e.target.getAttribute("cid"));
    console.log(test);
  }

  async function deleteCategory(e) {
    let id = String(await e.target.getAttribute("cid"));
    console.log(id);

    let res = await
      fetch(`http://127.0.0.1:4000/categories/${id}`, {
        method: "DELETE"
      })
  }

  async function handleTextUpdate(e) {
    name = e.target.value;

    if (e.target.value.length < 2 || e.target.value.length > 30)
      setMutedText("Category name must be 2-30 letters long.");
    else
      setMutedText("");
  }

  function handleParentChange(e) {
    parent = e.target.value;
  }

  function handleFormSubmission() {
    if (mutedText.length === 0) {
      setSubmissionText("");

      let parentId = parent
      if (String(parentId) === "0" || String(parentId) === "")
        parentId = null;

      let object = {
        "name": name,
        "parent": parentId
      };

      console.log(object);

      fetch("http://127.0.0.1:4000/categories", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      })
        .then((res) => {
          if (res.ok)
            return res.json();
          else
            throw new Error("Failed to add category");
        })
        .then((data) => {
          setArray((prev) => {
            let temp = [...prev];
            temp.push({
              "_id": data.insertedId,
              "name": name,
              "parent": parentId
            });
            return temp;
          });
          useEffectDependency = 3;
        })
        .catch((error) => {
          console.error("Error:", error);
          setSubmissionText("There was an error with the request. Please try again later.");
        });
    }
    else
      setSubmissionText("All Fields Must be Filled Properly!\n");
  }


  return (
    <>
      <Container fluid>
        <h1 className='text-center mb-4'>Manage Categories</h1>

        <Card className="my-2">
          <Card.Header className='bg-secondary text-white'>
            <h3>Edit Categories</h3>
          </Card.Header>
          <Card.Body style={{ padding: "0rem" }}>
            <ListGroup style={{ padding: "0.5rem" }}>
              <ListGroupItem className='bg-secondary' style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                <Row>
                  <Col className='col-6 bg-secondary text-white text-bold text-center'>
                    <p>Category</p>
                  </Col>
                  <Col className='col-4 bg-secondary text-white text-bold text-center'>
                    <p>Parent</p>
                  </Col>
                  <Col className='col-1 bg-secondary text-white text-bold text-center'>
                    <p>Actions</p>
                  </Col>
                </Row>
              </ListGroupItem>
              {array.map(i => {
                return (
                  <ListGroupItem style={{ padding: "0" }}>
                    <Container fluid>
                      <Row>
                        <Col className='col py-4 border'>
                          <p>{i.name}</p>
                        </Col>
                        <Col className='col-4 py-4 border'>
                          <p>{i.parent ? (array.find(c => c._id === i.parent).name) : "None"}</p>
                        </Col>
                        <Col className="col-1 text-center fs-4 border">
                          <p style={{ marginTop: "0.7rem" }}>
                            <FontAwesomeIcon cid={i._id} onClick={editCategory} icon={faPencil} />&nbsp;&nbsp;
                            <FontAwesomeIcon cid={i._id} onClick={deleteCategory} icon={faTrash} />
                          </p>
                        </Col>
                      </Row>
                    </Container>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Card.Body>
        </Card>

        <Card className='mt-3'>
          <Card.Header className='bg-secondary text-white'>
            <h3>Insert New Category</h3>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" onChange={handleTextUpdate} placeholder="Enter Category Name" />
                <Form.Text className="text-muted">{mutedText}</Form.Text>
              </Form.Group>

              <Form.Group className="my-3">
                <Form.Label>Parent:</Form.Label>
                <Form.Select onChange={handleParentChange}>
                  <option value={0}>None</option>
                  {array.map(i => <option value={i._id}>{i.name}</option>)}
                </Form.Select>
              </Form.Group>

              <Form.Text className="my-3" muted>{submissionText}</Form.Text>
              <Form.Group className="my-1">
                <Button type="button" className="bg-secondary" onClick={handleFormSubmission}>Submit</Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>

      </Container>
    </>
  );
}