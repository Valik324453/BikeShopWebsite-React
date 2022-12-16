import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

import About from "./components/About";
import Context from "./components/Context";
import Catalog from "./components/Catalog";
import Product from "./components/Product";
import Cart from "./components/Cart";
import NavbarC from "./components/NavbarC";

function App() {
  return (
    <Router>
      {<NavbarC />}
      <Context>
        <Routes>
          <Route path="/" element={<Catalog />}></Route>
          <Route path="/about" element={<About />} />
          <Route path=":id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Context>
    </Router>
  );
}

export default App;
