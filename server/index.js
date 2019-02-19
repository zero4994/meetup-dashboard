const express = require("express");
const app = require("./app.js")();
const path = require("path");
require("dotenv").config();
console.log("this is the key", process.env.MEETUP_KEY);

//app.use(express.static(path.resolve(__dirname, ".", "dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, ".", "dist", "index.html"));
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up an running on port ${PORT}`);
});
