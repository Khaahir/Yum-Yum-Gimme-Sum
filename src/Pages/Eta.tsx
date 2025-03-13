import React, { useEffect } from "react";
import Button from "../Componets/Button";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { showDetails } from "../redux/apiSlice";

function Eta() {
  const dispatch = useDispatch<AppDispatch>();

  const orderId = useSelector((state: RootState) => state.api.orderId);
  const etaData = useSelector((state: RootState) => state.api.etaValue[0]);
  const cart = useSelector((state: RootState) => state.api.cartItems);

  useEffect(() => {
    if (orderId) {
      console.log("🚀 Dispatching showDetails with orderId:", orderId);
      dispatch(showDetails({ id: orderId, eta: "", order: "" }));
    }
  }, [dispatch, orderId]);

  const formatETA = (eta: string) => {
    const etaTime = new Date(eta);
    const now = new Date();
    const diffInMs = etaTime.getTime() - now.getTime();
    const diffInMinutes = Math.max(Math.round(diffInMs / 600000), 0);
    return diffInMinutes > 0 ? `${diffInMinutes} minuter` : "Snart klar!";
  };

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
          <ul className=" eta-list">
            <li className="eta-li">
              <span className="eta-title">DINA WONTONS TILLAGAS!</span>
              <span className="eta-time">
                {etaData
                  ? `Beräknad tid: ${formatETA(etaData.id)}`
                  : "Beräknar LEveransTiden..."}
              </span>
              <span>{}</span>
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
