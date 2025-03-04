import Button from "../Componets/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toggleFunc } from "../redux/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
function Order() {
  const isOpen = useSelector(
    (state: { toggle: { value: boolean } }) => state.toggle.value
  );
  const dispatch = useDispatch();

  return (
    <>
      <Button Clicked={() => dispatch(toggleFunc())} variant="cart">
        <img src="./src/assets/cart-icon.svg" alt="cart.img" />
      </Button>

      {isOpen && (
        <section className="cart-container">
          <ul className="cart-orders">
            <li className="order-items">
              <span className="In-order-title">Karlstad</span>
              <span className="in-menu-price">9SEK</span>
            </li>
          </ul>
          <div className="total">
            <span className="in-cart-total">Total</span>
            <span className="in-cart-price">101SEK</span>
          </div>
          <Link className="btn-incart" to="/eta">
            <Button Clicked={() => dispatch(toggleFunc())} variant={"incart"}>
              Take my money!
            </Button>
          </Link>
        </section>
      )}
    </>
  );
}

export default Order;
