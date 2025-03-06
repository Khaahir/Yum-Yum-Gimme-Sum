import { addcount, removeCount, addCountByNumber } from "../redux/counterSlice";
import { useSelector, useDispatch } from "react-redux";

import React, { useState } from "react";

function counter() {
  const [count, setCount] = useState(2);
  const counterValue = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{counterValue}</span>
      <button onClick={() => dispatch(addcount())}>plus</button>
      <button onClick={() => dispatch(removeCount())}>Minus</button>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <button onClick={() => dispatch(addCountByNumber(count))}>
        add by amount {count}
      </button>
    </div>
  );
}

export default counter;
