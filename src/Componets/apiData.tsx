import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchDataMenu } from "../redux/apiSlice";
import Button from "./Button";
import { addToCart } from "../redux/apiSlice";
import { MenuItem } from "../redux/apiSlice";

const ApiComp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { menuData, status } = useSelector((state: RootState) => state.apidata);

  const handleAddToCart = (item: MenuItem) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDataMenu());
    }
  }, [status, dispatch]);

  return (
    <section>
      <div>
        <ul className="menu-list">
          {menuData
            .filter((item) => item.type === "wonton")
            .map((item) => (
              <Button
                key={item.id}
                variant="food"
                Clicked={() => handleAddToCart(item)}
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
      </div>
      <div>
        <h2 style={{ textAlign: "center", fontSize: "1.5rem" }}>Drinks</h2>
        <ul>
          {menuData
            .filter((item) => item.type === "drink")
            .map((item) => (
              <Button
                key={item.id}
                variant="drinks"
                Clicked={() => handleAddToCart(item)}
              >
                <li className="menu-drinks">
                  {item.name}
                  <span className="in-menu-price">{item.price}SEK</span>
                </li>
              </Button>
            ))}
        </ul>
      </div>

      <div className="menu-dips">
        <section className="dip">
          <span>DIPSÅS</span>
          <span>19kr</span>
        </section>
        <ul>
          {menuData
            .filter((item) => item.type === "dip")
            .map((item) => (
              <Button
                key={item.id}
                variant="dip"
                Clicked={() => handleAddToCart(item)}
              >
                {item.name}
              </Button>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default ApiComp;
