import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import FormPage from "./components/FormPage";
import StockDetails from "./components/StockDetails";
import { Provider } from "react-redux";
import store from "./utils/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/stock/:id" element={<StockDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
