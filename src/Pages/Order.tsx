import Button from "../Componets/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFunc } from "../redux/toggleSlice";
import { sendCart, showDetails } from "../redux/apiSlice";
import { RootState, AppDispatch } from "../redux/store";

function Order() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.api.cartItems);
  const isOpen = useSelector((state: RootState) => state.toggle.value);

  const handleOrder = async () => {
    if (cart.length === 0) return; // Förhindra tom beställning
    const orderResponse = await dispatch(sendCart(cart)).unwrap();
    if (orderResponse) {
      dispatch(showDetails(orderResponse));
    }
  };

  return (
    <>
      <Button variant="cart" Clicked={() => dispatch(toggleFunc())}>
        <img src="./src/assets/cart-icon.svg" alt="cart.img" />
      </Button>

      {isOpen && (
        <section className="cart-container">
          {cart.length > 0 ? (
            <ul className="cart-orders">
              {cart.map((item) => (
                <li key={item.id} className="order-items">
                  <Button variant="decrease">➖</Button>
                  <span className="In-order-title">{item.name}</span>
                  <span className="in-menu-price">{item.price} SEK</span>
                  <Button variant="increase">➕</Button>
                  <Button variant="remove">❌</Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="order-items">Inget i varukorgen</p>
          )}

          <div className="total">
            <span className="in-cart-total">Total</span>
            <span className="in-cart-price">
              {cart.reduce((acc, item) => acc + item.price, 0)} SEK
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
