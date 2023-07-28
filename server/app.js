// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", async (req, res) => {
  let success = false;
  const { symbol, date } = req.body;

  try {
    const API_URL = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${date}/${date}?apiKey=${process.env.API_KEY}`;
    const response = await axios.get(API_URL);
    const data = response.data;

    success = true;
    res.status(200).json({ data, success });
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json({ err: err.response.data });
    } else if (err.request) {
      res.status(500).json({ err: "No Results Found" });
    } else {
      res.status(500).json({ err: "Internal server error occurred." });
    }
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
