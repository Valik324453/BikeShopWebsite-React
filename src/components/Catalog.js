import React, { useContext, useEffect, useState } from "react";
import { ctx } from "./Context";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Catalog() {
  const { items, setItems } = useContext(ctx);
  const [param, setParam] = useState(0);

  const [filter, setFilter] = useState("all");
  const [temp, setTemp] = useState([]);
  const [itemsList, setitemsList] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(itemsList));
    setTemp(itemsList);
    setitemsList(items);
  }, [itemsList]);

  function renderSwitch(param) {
    switch (param) {
      case 0:
        return [...temp]
          .sort((b, a) => a.price - b.price)
          .map((product) => {
            return (
              <Col xs={6} sm={4} md={3}>
                <img className="bike-img-catalog" src={product.img} alt="" />
                <h3>{product.title}</h3>
                <h4>Manufacturer: {product.manufacturer}</h4>
                <h5>Price: ${product.price}</h5>

                <h6 className="outOfStockAlert">
                  {product.stock < 1 ? "Out of stock" : ""}
                </h6>
                <Link to={"/" + product.id}>Show details</Link>
              </Col>
            );
          });

      default:
        return [...temp]
          .sort((a, b) => a.price - b.price)
          .map((product) => {
            return (
              <Col xs={6} sm={4} md={3}>
                <img className="bike-img-catalog" src={product.img} alt="" />
                <h3>{product.title}</h3>
                <h4>Manufacturer: {product.manufacturer}</h4>
                <h5>Price: ${product.price}</h5>
                <h6 className="outOfStockAlert">
                  {product.stock < 1 ? "Out of stock" : ""}
                </h6>
                <Link to={"/" + product.id}>Show details</Link>
              </Col>
            );
          });
    }
  }

  useEffect(() => {
    if (filter === "All") {
      setTemp(itemsList);
    } else {
      setTemp(itemsList.filter((item) => item.manufacturer === filter));
    }
  }, [filter]);

  return (
    <>
      <Container className="sort-and-filter">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <p>
              <b>Filter</b> by manufacturer:
            </p>
          </Col>
          <Col md="auto">
            <Form.Select
              size="sm"
              aria-label="Default select example"
              className="select-filter"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="All">All</option>
              <option value="Giant">Giant</option>
              <option value="Redline">Redline</option>
              <option value="Bicyclette">Bicyclette</option>
            </Form.Select>
          </Col>
          <Col md="auto">
            <p>
              <b>Sort</b> by price:
            </p>
          </Col>
          <Col md="auto">
            <ButtonGroup size="sm">
              <Button onClick={() => setParam(0)}>Desc</Button>
              <Button onClick={() => setParam(1)}>Asc</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>{renderSwitch(param)}</Row>
      </Container>
    </>
  );
}
