import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Order from "./Order";
import { RootState, AppDispatch } from "../redux/store";
import { getMenu, addToCart } from "../redux/apiSlice";
import Button from "../Componets/Button";

const Menu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menu = useSelector((state: RootState) => state.api.menu);

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  return (
    <section className="menu-body">
      <Order />
      <img className="menu-icon" src="./src/assets/logo.svg" alt="logo" />
      <div className="menu-container">
        <h2 className="menu-title">MENY</h2>

        <section className="wontons">
          <ul className="menu-list">
            {menu
              .filter((item) => item.type === "wonton")
              .map((item) => (
                <Button
                  key={item.id}
                  variant="food"
                  Clicked={() =>
                    dispatch(
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                      })
                    )
                  }
                >
                  <li className="menu">
                    <span className="in-menu-title">{item.name}</span>
                    <span className="in-menu-price">{item.price} SEK</span>
                    <span className="ingredients">
                      {Object(item.ingredients).join(", ")}
                    </span>
                  </li>
                </Button>
              ))}
          </ul>
        </section>

        <section className="drinks">
          <h2 style={{ textAlign: "center", fontSize: "2rem" }}> Drinks</h2>
          <ul className="menu-list">
            {menu
              .filter((item) => item.type === "drink")
              .map((item) => (
                <Button
                  key={item.id}
                  variant="drinks"
                  Clicked={() =>
                    dispatch(
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                      })
                    )
                  }
                >
                  <li className="menu-drinks">
                    <span className="in-menu-title">{item.name}</span>
                    <span className="in-menu-price">{item.price} SEK</span>
                  </li>
                </Button>
              ))}
          </ul>
        </section>

        <section className="dips">
          <h2 style={{ textAlign: "center", fontSize: "2rem" }}>Dips 19 SEK</h2>
          <ul className="menu-dips">
            {menu
              .filter((item) => item.type === "dip")
              .map((item) => (
                <Button
                  key={item.id}
                  variant="dip"
                  Clicked={() =>
                    dispatch(
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                      })
                    )
                  }
                >
                  <li>
                    <span className="in-menu-title">{item.name}</span>
                  </li>
                </Button>
              ))}
          </ul>
        </section>
      </div>
    </section>
  );
};

export default Menu;
