const express = require("express");
const cricketers = require("./data/cricketers");

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/cricketers", (req, res) => {
  res.json(cricketers);
});

app.get("/api/cricketers/:id", (req, res) => {
  const cricketer = cricketers.find((p) => p._id === req.params.id);
  res.json(cricketer);
});

app.listen(5000, console.log("Server running on port https://localhost:5000"));
