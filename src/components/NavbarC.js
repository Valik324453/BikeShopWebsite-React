import { NavLink } from "react-router-dom";
import { BiHomeAlt, BiBookAlt, BiCart } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavbarC() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/"
          >
            <BiHomeAlt size={40} />
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/about"
          >
            <FcAbout size={40} />
          </NavLink>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/cart"
          >
            <BiCart size={40} />
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
