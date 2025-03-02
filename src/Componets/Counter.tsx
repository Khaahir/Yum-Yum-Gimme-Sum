import {
  decrement,
  increment,
  incrementByAmount,
} from "../State/counter/counterSlice.tsx";
import { RootState } from "../State/store.ts";
import { useDispatch, useSelector } from "react-redux";

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => dispatch(incrementByAmount(10))}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </div>
  );
}

export default Counter;
