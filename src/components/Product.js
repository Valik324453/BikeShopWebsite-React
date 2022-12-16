import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ctx } from "./Context";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Product() {
  let { id } = useParams();
  const { items, setCart, cart } = useContext(ctx);
  let product = items.filter((product) => product.id === id)[0];
  const [disable, setDisable] = useState(false);
  const [buttonText, setButtonText] = useState("Add to cart");
  let checkCart;

  function handleClick() {
    setButtonText("Already in Cart");
  }

  function outOfStockButton() {
    setButtonText("Out of stock");
  }

  function alreadyIn() {
    checkCart = cart.filter((product) => product.id === id)[0];
    return checkCart;
  }

  useEffect(() => {
    if (alreadyIn() !== undefined) {
      setDisable(true);
      handleClick();
    }
    if (product.stock < 1) {
      setDisable(true);
      outOfStockButton();
    }
  });

  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Card
            className="card mb-4 border-0"
            animation="glow"
            style={{ width: "40vw" }}
          >
            <Card.Img variant="top" src={product.img} />
          </Card>

          <Card
            className="card mb-4 border-0"
            animation="glow"
            style={{ width: "40vw" }}
          >
            <Card.Body className="description">
              <Placeholder as="p" animation="glow">
                {product.title} / {product.manufacturer}
              </Placeholder>
              <Card.Text>{product.description}</Card.Text>
              <Card.Subtitle>${product.price}</Card.Subtitle>
              <br />
              <Button
                disabled={disable}
                onClick={() => {
                  setCart((prevCart) => [...prevCart, { ...product, qnt: 1 }]);
                  setDisable(true);
                  handleClick();
                }}
                variant="primary"
              >
                {buttonText}
              </Button>
              {console.log(alreadyIn())}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
}
