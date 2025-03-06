import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from "./redux/actions";

const App = () => {
  const dispatch = useDispatch();
  
  const dataState = useSelector((state) => {
    console.log("Redux State:", state); // Log the entire Redux store
    return state.data;
  });
  
  const { loading, data = [], error } = dataState || {};
  


  useEffect(() => {
    dispatch(fetchDataRequest()); // Dispatch action to trigger saga
  }, [dispatch]);

  return (
    <div>
      <h1>Redux Saga API Fetch Example</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {data && data.length > 0 ? (
          data.map((item) => <li key={item.id}>{item.title}</li>)
        ) : (
          <p>No data available</p>
        )}
      </ul>

    </div>
  );
};

export default App;