const express = require("express");
const morgan = require("morgan");
const unirest = require("unirest");
const axios = require("axios");

const initializeServer = () => {
  const app = express();
  app.use(morgan("combined"));

  app.get("/api/meetups/:country/:city", async (req, res) => {
    const country = req.params.country;
    const city = req.params.city;
    const state = req.query.state;
    console.log(`Getting events for ${city}, ${country}`);
    try {
      const optional = state ? `&state=${state}` : "";

      const { data } = await axios({
        url: `https://api.meetup.com/2/open_events.json?country=${country}&city=${city}${optional}&key=${
          process.env.MEETUP_KEY
        }`,
        method: "get"
      });
      console.log(`Found ${data.meta.count} events`);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.get("/api/cities/:country", async (req, res) => {
    const country = req.params.country;
    console.log(`Getting all cities for ${country}`);
    try {
      const { data } = await axios({
        url: `https://api.meetup.com/2/cities?country=${country}`,
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
    //res.sendStatus(200);
  });

  app.get("/api/holidays/:country", async (req, res) => {
    try {
      const country = req.params.country;
      const year = new Date().getFullYear();

      unirest.get(`https://calendarific.p.rapidapi.com/holidays?year=${year}&country=${country}`)
      .header("X-RapidAPI-Key", process.env.API_KEY)
      .end(function (result) {
        // console.log(result.status, result.headers, result.body);
        res.json(result);
      });


    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  return app;
};

module.exports = initializeServer;
