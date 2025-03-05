import React from "react";
import { UseSelector, useDispatch } from "react-redux";
("");

function Bill() {
  const isOpen = useSelector(
    (state: { toggle: { value: boolean } }) => state.toggle.value
  );
  const dispatch = useDispatch();
}

export default Bill;
