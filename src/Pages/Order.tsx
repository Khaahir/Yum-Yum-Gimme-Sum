import Button from "../Componets/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFunc } from "../redux/toggleSlice";
import { RootState, AppDispatch } from "../redux/store";
import { sendOrder } from "../redux/apiSlice";

function Order() {
  const isOpen = useSelector(
    (state: { toggle: { value: boolean } }) => state.toggle.value
  );

  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.api.cart);
  const loading = useSelector((state: RootState) => state.api.loading);
  const error = useSelector((state: RootState) => state.api.error);

  return (
    <>
      <Button Clicked={() => dispatch(toggleFunc())} variant="cart">
        <img src="./src/assets/cart-icon.svg" alt="cart.img" />
      </Button>

      {isOpen && (
        <section className="cart-container">
          <ul className="cart-orders">
            {cart.map((item) => (
              <li key={item.itemId} className="order-items">
                <Button variant="decrease">➖</Button>
                <span className="In-order-title">{item.name}</span>
                <span className="in-menu-price">SEK</span>
                <span className="quantity"></span>
                <Button variant="increase">➕</Button>
                <Button variant="remove">❌</Button>
              </li>
            ))}
            <li className="order-items">Inget i varukorgen</li>
          </ul>

          <div className="total">
            <span className="in-cart-total">Total</span>
            <span className="in-cart-price">SEK</span>
          </div>
          <Link className="btn-incart" to="/eta">
            <Button Clicked={() => dispatch(toggleFunc())} variant={"incart"}>
              TAKE MY MONEY!
            </Button>
          </Link>
        </section>
      )}
    </>
  );
}

export default Order;
