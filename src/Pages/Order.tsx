import Button from "../Componets/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFunc } from "../redux/toggleSlice";
import { sendOrder } from "../redux/api";
import { showDetails } from "../redux/apiSlice";
import { RootState, AppDispatch } from "../redux/store";

function Order() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.api.cartItems);
  const isOpen = useSelector(
    (state: { toggle: { value: boolean } }) => state.toggle.value
  );
  return (
    <>
      <Button variant="cart" Clicked={() => dispatch(toggleFunc())}>
        <img src="./src/assets/cart-icon.svg" alt="cart.img" />
      </Button>

      {isOpen && (
        <section className="cart-container">
          <ul className="cart-orders">
            {cart.map((item) => (
              <li key={item.id} className="order-items">
                <Button variant="decrease">➖</Button>
                <span className="In-order-title">{item.name}</span>
                <span className="in-menu-price"></span>
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
            <Button
              variant={"incart"}
              Clicked={() => {
                sendOrder(cart);
              }}
            >
              TAKE MY MONEY!
            </Button>
          </Link>
        </section>
      )}
    </>
  );
}

export default Order;
