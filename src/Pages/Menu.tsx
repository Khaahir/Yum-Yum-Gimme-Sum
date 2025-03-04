import React, { useState } from "react";
import Order from "./Order";

function Menu() {
  return (
    <>
      <section className="menu-body">
        <Order />
        <img className="menu-icon" src="./src/assets/logo.svg" alt="logo" />
        <div className="menu-container">
          <h2 className="menu-title">MENY</h2>
          <ul>
            <li className="menu">
              <span className="In-menu-title">Karlstad</span>
              <span className="ingrediences">
                Kantarell,sharlottenlök, morot, bladpersilja
              </span>
              <span className="in-menu-price">9SEK</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Menu;
