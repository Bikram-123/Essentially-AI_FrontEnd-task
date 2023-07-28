import React from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { useNavigate, useParams } from "react-router-dom";

const StockDetails = () => {
  const stockDetails = useSelector((state) => state.stock.results); // Accessing the Global state

  const navigate = useNavigate();
  const params = useParams(); // For getting the params in the URL

  //Return Spinner if the Global state is empty
  console.log(stockDetails);
  if (!stockDetails) {
    return <Spinner />;
  }

  // Navigating to the Home Page after Button Click
  const onClickHandler = () => {
    navigate("/");
  };

  return (
    { stockDetails } && (
      <div className="h-screen flex items-center justify-center bg-gray-600">
        {stockDetails.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="mb-2 text-gray-600 font-bold text-3xl">
              Given Below are the details for {params.symbol}
            </h1>
            <ul className="block text-gray-700 text-xl font-bold mb-2">
              <li>Open Price: {item.Open}</li>
              <li>Highest Price:{item.High}</li>
              <li>Lowest Price: {item.Low}</li>
              <li>Close Price: {item.Close}</li>
              <li>Volume: {item.Volume}</li>
            </ul>
            <h3 className="m-2 text-gray-600 font-bold text-3xl">
              Want to check other Stock
              <button
                onClick={onClickHandler}
                className="bg-blue-500 m-2 hover:bg-blue-700 text-whie font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                ClickMe!
              </button>
            </h3>
          </div>
        ))}
      </div>
    )
  );
};

export default StockDetails;
