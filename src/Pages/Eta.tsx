import React from "react";
import Button from "../Componets/Button";
import { Link } from "react-router-dom";

function Eta() {
  return (
    <div>
      <section className="eta-container">
        <img className="eta-logo" src="./src/assets/logo.svg" alt="logo" />
        <img
          className="eta-food-box"
          src="./src/assets/boxtop.svg"
          alt="logo on a box"
        />
        <span className="eta-title">DINA WONTONS TILLAGAS!</span>
        <span className="eta-time">ETA 5 min</span>
        <span className="eta-order">#4kjwsdf234k</span>
        <Link className="btn-new-order" to="/">
          <Button variant="new-order">GÖR EN NY BESTÄLLNING</Button>
        </Link>
        <Button variant="show-bill">SE KVITTO</Button>
      </section>
    </div>
  );
}

export default Eta;
