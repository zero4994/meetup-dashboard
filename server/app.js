const express = require("express");
const morgan = require("morgan");

const initializeServer = () => {
  const app = express();
  app.use(morgan("combined"));

  app.get("/api/meetups", async (req, res) => {
    res.sendStatus(200);
  });

  return app;
};

module.exports = initializeServer;
