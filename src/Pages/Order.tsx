import Button from "../Componets/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFunc } from "../redux/toggleSlice";
import { RootState } from "../redux/store";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/apiSlice";

function Order() {
  const isOpen = useSelector(
    (state: { toggle: { value: boolean } }) => state.toggle.value
  );
  const cartItems = useSelector((state: RootState) => state.apidata.cart);

  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Button Clicked={() => dispatch(toggleFunc())} variant="cart">
        <img src="./src/assets/cart-icon.svg" alt="cart.img" />
      </Button>

      {isOpen && (
        <section className="cart-container">
          <ul className="cart-orders">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li className="order-items" key={item.id}>
                  <Button
                    Clicked={() => dispatch(decreaseQuantity(item.id))}
                    variant="decrease"
                  >
                    ➖
                  </Button>
                  <span className="In-order-title">{item.name}</span>
                  <span className="in-menu-price">{item.price}SEK</span>

                  <span className="quantity">{item.quantity}</span>

                  <Button
                    Clicked={() => dispatch(increaseQuantity(item.id))}
                    variant="increase"
                  >
                    ➕
                  </Button>

                  <Button
                    Clicked={() => dispatch(removeFromCart(item.id))}
                    variant="remove"
                  >
                    ❌
                  </Button>
                </li>
              ))
            ) : (
              <li className="order-items">Inget i varukorgen</li>
            )}
          </ul>
          <div className="total">
            <span className="in-cart-total">Total</span>
            <span className="in-cart-price">{total}SEK</span>
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
