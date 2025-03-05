import React from "react";
import { UseSelector, useDispatch } from "react-redux";
import Button from "../Componets/Button";
import { Link } from "react-router-dom";

function Bill() {
  return (
    <section className="bill-body">
      <img className="bill-icon" src="./src/assets/logo.svg" alt="logo color" />
      <div className="bill-container">
        <img
          className="bill-color-logo"
          src="./src/assets/color-logo.svg"
          alt=""
        />
        <h2 className="bill-title">KVITTO</h2>
        <span className="bill-order-number">131232121#esef</span>
        <ul>
          <li className="bill-items">
            <span className="In-bill-title">Karlstad</span>
            <span className="in-bill-price">9SEK</span>
          </li>
        </ul>
        <div className="bill-total">
          <span>Total</span>
          <span>101SEK</span>
        </div>
      </div>
      <Link className="btn-in-bill" to={"/"}>
        <Button variant="in-bill">GÖR EN NY BESTÄLLNING</Button>
      </Link>
    </section>
  );
}

export default Bill;
