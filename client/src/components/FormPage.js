import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getStockData, reset } from "../utils/stockSlice";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const URL = "http://localhost:5000"; // The URl for APi call

  //To store Form data entered by user (local storage)
  const [formData, setFormData] = useState({
    symbol: "",
    date: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let Success = false;

  // Reseting the Global state on page initial rendering
  useEffect(() => {
    dispatch(reset());
    // eslint-disable-next-line
  }, []);

  const { symbol, date } = formData;

  // storing Form data from Input fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.toUpperCase(),
    }));
  };

  // function for fetching the data from backend API as per the query string
  const fetchData = async (userdata) => {
    const { symbol, date } = userdata;

    const dateValidator = new Date(date);

    //Checking whether the date entered by the USER is doesn't lie on weekend
    if (dateValidator.getDay() === 0 || dateValidator.getDay() === 6) {
      return alert("The day must not be a Weekend");
    }
    try {
      const data = await fetch(`${URL}/api/fetchStockData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbol, date }),
      });
      const response = await data.json();
      Success = response.success;

      if (response?.data?.resultsCount > 0 && response.success) {
        let result = response.data.results[0];

        // Dispatching action to store fetched data to global store
        dispatch(
          getStockData({
            Open: result.o,
            High: result.h,
            Low: result.l,
            Close: result.c,
            Volume: result.v,
          })
        );
        return response.success;
      } else {
        alert("Please add valid values for Symbol and Date");
        navigate("/");
      }
    } catch (err) {
      alert(err);
      navigate("/");
    }
  };

  //Handling submission of Form
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const userData = { symbol, date };
    Success = await fetchData(userData);
    if (Success) {
      navigate(`/stock/${symbol}`);
    } else {
      setFormData({
        symbol: "",
        date: "",
      });
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-600">
        <form
          onSubmit={onFormSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="mb-2 text-gray-600 font-bold text-xl">
            Enter the stock you want to search
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="symbol"
            >
              Stock Symbol
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                type="text"
                value={symbol}
                name="symbol"
                placeholder="e.g. AAPL"
                onChange={onChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="symbol"
            >
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              type="date"
              value={date}
              name="date"
              onChange={onChange}
            />
          </div>
          <div className="flex items-center justify-between">
            {symbol && date && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-whie font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Search
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default FormPage;
