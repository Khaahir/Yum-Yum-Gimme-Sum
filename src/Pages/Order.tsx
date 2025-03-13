import Button from "../Componets/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFunc } from "../redux/toggleSlice";
import {
  increase,
  decrease,
  removeFromCart,
  clearCart,
} from "../redux/apiSlice";
import { sendCart, showDetails } from "../redux/apiSlice";
import { RootState, AppDispatch } from "../redux/store";

function Order() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.api.cartItems);
  const isOpen = useSelector((state: RootState) => state.toggle.value);

  const handleOrder = async () => {
    if (cart.length === 0) return;
    const orderResponse = await dispatch(sendCart(cart));

    if (orderResponse) {
      dispatch(showDetails());
      dispatch(clearCart());
    }
  };

  return (
    <>
      <Button variant="cart" Clicked={() => dispatch(toggleFunc())}>
        {cart.length > 0 && (
          <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
        )}
        <img src="./src/assets/cart-icon.svg" alt="cart.img" />
      </Button>

      {isOpen && (
        <section className="cart-container">
          {cart.length > 0 ? (
            <ul className="cart-orders">
              {cart.map((item) => (
                <li key={item.id} className="order-items">
                  <Button
                    variant="decrease"
                    Clicked={() => dispatch(decrease(item.id))}
                  >
                    ➖
                  </Button>
                  <span className="In-order-title">
                    {item.name} ({item.quantity})
                  </span>
                  <span className="in-menu-price">
                    {item.price * item.quantity} SEK
                  </span>
                  <Button
                    variant="increase"
                    Clicked={() => dispatch(increase(item.id))}
                  >
                    ➕
                  </Button>
                  <Button
                    variant="remove"
                    Clicked={() => dispatch(removeFromCart(item.id))}
                  >
                    ❌
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="order-items">Inget i varukorgen</p>
          )}

          <div className="total">
            <span className="in-cart-total">Total</span>
            <span className="in-cart-price">
              {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
              SEK
            </span>
          </div>

          <Link className="btn-incart" to="/eta">
            <Button variant="incart" Clicked={handleOrder}>
              TAKE MY MONEY!
            </Button>
          </Link>
        </section>
      )}
    </>
  );
}

export default Order;
