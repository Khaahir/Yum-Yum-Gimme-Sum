import React, { useEffect } from "react";
import Button from "../Componets/Button";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/apiSlice";

function Eta() {
  const dispatch = useDispatch<AppDispatch>();
  const eta = useSelector((state: RootState) => state.api.etaValue || []);
  const carItems = useSelector((state: RootState) => state.api.cartItems);
  console.log(eta);

  useEffect(() => {
    dispatch(getCart(carItems));
  }, [dispatch]);
  return (
    <div>
      <section className="eta-container">
        <img className="eta-logo" src="./src/assets/logo.svg" alt="logo" />
        <img
          className="eta-food-box"
          src="./src/assets/boxtop.svg"
          alt="logo on a box"
        />
        <ul>
          {eta.map((item) => (
            <span>{item.eta}</span>
          ))}
        </ul>

        <span className="eta-title">DINA WONTONS TILLAGAS!</span>
        <span className="eta-time">ETA 5 min</span>
        <span className="eta-order">#4kjwsdf234k</span>
        <Link className="btn-new-order" to="/">
          <Button variant="new-order">GÖR EN NY BESTÄLLNING</Button>
        </Link>
        <Link to={"/bill"} className="btn-show-bill">
          <Button variant="show-bill">SE KVITTO</Button>
        </Link>
      </section>
    </div>
  );
}

export default Eta;
