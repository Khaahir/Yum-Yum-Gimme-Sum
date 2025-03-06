import React, { useEffect, useState } from "react";
import Order from "./Order";

function Menu() {
  return (
    <section className="menu-body">
      <Order />
      <img className="menu-icon" src="./src/assets/logo.svg" alt="logo" />
      <div className="menu-container">
        <h2 className="menu-title">MENY</h2>
        <ul></ul>
      </div>
    </section>
  );
}

export default Menu;
