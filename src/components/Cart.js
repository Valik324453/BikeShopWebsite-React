import React, { ctx } from "./Context";
import { useContext, useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export default function About() {
  const { cart, setCart } = useContext(ctx);
  const { tooltipTrigger, setTooltipTrigger } = useState("Add 1 more to chart");

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add 1 more to chart
    </Tooltip>
  );

  const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      No more on stock
    </Tooltip>
  );

  useEffect(() => {
    cart.forEach((bike) => {
      if (bike.qnt <= 0) {
        removeBike(bike.id);
      }
    });
  }, [cart]);

  function addQnt(id) {
    let newCart = cart.map((bike) => {
      if (bike.id === id) {
        if (bike.qnt < bike.stock) {
          return { ...bike, qnt: bike.qnt + 1 };
        } else {
          return bike;
        }
      } else {
        return bike;
      }
    });
    setCart(newCart);
  }

  function subQnt(id) {
    let newCart = cart.map((bike) => {
      if (bike.id === id) {
        return { ...bike, qnt: bike.qnt - 1 };
      } else {
        return bike;
      }
    });
    setCart(newCart);
  }

  function removeBike(id) {
    let newCart = cart.filter((game) => game.id !== id);
    setCart(newCart);
  }

  function sum() {
    return cart.reduce((sum, x) => x.price * x.qnt + sum, 0);
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Price $</th>
            <th>Quantity</th>
            <th>Price sum</th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0
            ? cart.map((bike) => (
                <tr>
                  <td>{bike.title}</td>
                  <td>{bike.manufacturer}</td>
                  <td>{bike.price}</td>
                  <td>
                    {bike.qnt}{" "}
                    <ButtonGroup size="sm">
                      <Button
                        onClick={() => {
                          subQnt(bike.id);
                        }}
                      >
                        -
                      </Button>
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                          bike.qnt < bike.stock ? renderTooltip : renderTooltip2
                        }
                      >
                        <Button
                          onClick={() => {
                            addQnt(bike.id);
                          }}
                        >
                          +
                        </Button>
                      </OverlayTrigger>
                    </ButtonGroup>
                  </td>
                  <td>${bike.price * bike.qnt}</td>
                  <td>
                    {" "}
                    <Button
                      onClick={() => {
                        removeBike(bike.id);
                      }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))
            : "Cart is empty"}
        </tbody>
      </Table>

      <p>Total price: {sum()}</p>
    </>
  );
}
