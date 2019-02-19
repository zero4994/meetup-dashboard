const express = require("express");
const morgan = require("morgan");
const unirest = require("unirest");
const axios = require("axios");

const initializeServer = () => {
  const app = express();
  app.use(morgan("combined"));

  app.get("/api/meetups", async (req, res) => {
    console.log("this is the key", process.env.MEETUP_KEY);

    const { data } = await axios({
      url: `https://api.meetup.com/2/events?key=${
        process.env.MEETUP_KEY
      }&group_urlname=ny-tech&sign=true`,
      method: "get"
    });
    res.json(data);
  });

  return app;
};

module.exports = initializeServer;
