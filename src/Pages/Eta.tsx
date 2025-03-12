import React, { useEffect } from "react";
import Button from "../Componets/Button";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { showDetails, sendCart } from "../redux/apiSlice";

function Eta() {
  const calculateETA = (timestamp: string) => {
    const orderTime = new Date(timestamp); // Konvertera till datumobjekt
    const now = new Date(); // Hämta aktuell tid

    const diffInMs = orderTime.getTime() - now.getTime(); // Skillnad i millisekunder
    const diffInMinutes = Math.round(diffInMs / 60000); // Omvandla till minuter

    return diffInMinutes > 0 ? `${diffInMinutes} min` : "Snart klar!";
  };
  const orderId = useSelector((state: RootState) => state.api.orderId); // Hämta orderId från Redux

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (orderId) {
      dispatch(showDetails()); // Skicka med orderId som argument
    }
  }, [dispatch, orderId]);
  return (
    <>
      <div>
        <section className="eta-container">
          <img className="eta-logo" src="./src/assets/logo.svg" alt="logo" />
          <img
            className="eta-food-box"
            src="./src/assets/boxtop.svg"
            alt="logo on a box"
          />
          <ul>
            <li>
              <span className="eta-order">()</span>
              <span className="eta-title">DINA WONTONS TILLAGAS!</span>
              <span className="eta-time"></span>
            </li>
          </ul>
          <Link className="btn-new-order" to="/">
            <Button variant="new-order">GÖR EN NY BESTÄLLNING</Button>
          </Link>
          <Link to={"/bill"} className="btn-show-bill">
            <Button variant="show-bill">SE KVITTO</Button>
          </Link>
        </section>
      </div>
    </>
  );
}

export default Eta;
