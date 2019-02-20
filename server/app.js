const express = require("express");
const morgan = require("morgan");
//const unirest = require("unirest");
const axios = require("axios");

const initializeServer = () => {
  const app = express();
  app.use(morgan("combined"));

  app.get("/api/meetups", async (req, res) => {
    console.log("this is the key", process.env.MEETUP_KEY);
    try {
      const { data } = await axios({
        url: `https://api.meetup.com/2/open_events.json?country=mx&city=Chicago&state=IL&key=${
          process.env.MEETUP_KEY
        }`,
        method: "get"
      });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.get("/app/cities", async (req, res) => {
    res.sendStatus(200);
  });

  return app;
};

module.exports = initializeServer;
