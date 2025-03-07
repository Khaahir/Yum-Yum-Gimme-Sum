import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store"; // Importera typer från store
import { fetchData } from "../redux/apiKeySlice";

const ApiKeyComp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.apiKey
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  let content;
  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    content = <span>{data.key}</span>;
  } else {
    content = <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>codeKEy:</h1>
      <span>{content}</span>
    </div>
  );
};

export default ApiKeyComp;
