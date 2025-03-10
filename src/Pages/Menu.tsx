import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu, getApiKey } from "../redux/apiSlice";
import { sendOrder } from "../redux/apiSlice";
import { RootState, AppDispatch } from "../redux/store";

import Order from "./Order";
import Button from "../Componets/Button";
import { addToCart } from "../redux/api";

const Menu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menu = useSelector((state: RootState) => state.api.menu);
  const loading = useSelector((state: RootState) => state.api.loading);
  const error = useSelector((state: RootState) => state.api.error);

  useEffect(() => {
    dispatch(getApiKey()).then(() => {
      dispatch(getMenu());
    });
  }, [dispatch]);

  const AddToCart = (id: number) => {
    dispatch(sendOrder({ id, quantity: 1 })); // 🔥 Add one quantity to cart
  };

  if (loading) return <p>Laddar meny...</p>;
  if (error) return <p>Fel: {error}</p>;
  return (
    <section className="menu-body">
      <Order />
      <img className="menu-icon" src="./src/assets/logo.svg" alt="logo" />
      <div className="menu-container">
        <h2 className="menu-title">MENY</h2>
        <div>
          <ul className="menu-list">
            {menu
              .filter((item) => item.type === "wonton")
              .map((item) => (
                <Button
                  key={item.id}
                  Clicked={() => AddToCart(1)}
                  variant="food"
                >
                  <li className="menu">
                    <span className="in-menu-title">{item.name}</span>
                    <span className="in-menu-price">{item.price} SEK </span>
                    <span className="ingredients">
                      {Object(item.ingredients).join(", ")}
                    </span>
                  </li>
                </Button>
              ))}
          </ul>
        </div>
        <div>
          <h2 style={{ textAlign: "center", fontSize: "1.5rem" }}>Drinks</h2>
          <ul className="menu-list">
            {menu
              .filter((item) => item.type === "drink")
              .map((item) => (
                <li className="menu">
                  <Button
                    key={item.id}
                    Clicked={() => handleAddToCart(item.id)}
                    variant="drinks"
                  >
                    <span className="in-menu-title">{item.name}</span>
                    <span className="in-menu-price">{item.price} SEK </span>
                  </Button>
                </li>
              ))}
          </ul>
        </div>
        <h2 style={{ textAlign: "center", fontSize: "1.5rem" }}>Dips</h2>
        <ul className="menu-dips">
          {menu
            .filter((item) => item.type === "dip")
            .map((item) => (
              <li key={item.id} className="dip-list">
                <Button key={item.id} variant="dip">
                  <span>{item.name}</span>
                </Button>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Menu;
