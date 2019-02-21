const express = require("express");
const app = require("./app.js")();
const path = require("path");
require("dotenv").config();

app.use(express.static(path.resolve(__dirname, "../", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up an running on port ${PORT}`);
});
