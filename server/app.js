const express = require("express");
const morgan = require("morgan");
const unirest = require("unirest");
const axios = require("axios");

const getHolidayByCountry = country => {
  //const country = req.params.country;
  const year = new Date().getFullYear();

  // unirest
  //   .get(
  //     `https://calendarific.p.rapidapi.com/holidays?year=${year}&country=${country}`
  //   )
  //   .header("X-RapidAPI-Key", process.env.API_KEY)
  //   .end(function(result) {
  //     console.log(result.body);
  //     //res.json(result.body.response.holidays || []);
  //   });

  return axios({
    url: `https://calendarific.p.rapidapi.com/holidays?year=${year}&country=${country}`,
    method: "get",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY
    }
  });
};

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

      const holidays = await getHolidayByCountry(country);
      const parsedHolidays = holidays.data.response.holidays.map(day => {
        return day.date.datetime;
      });

      const results = data.results.map(meetup => {
        const meetUpDate = new Date(meetup.time);
        const isHoliday = parsedHolidays
          .filter(holiday => {
            return holiday.month === meetUpDate.getMonth() + 1;
          })
          .filter(holiday => {
            return holiday.day === meetUpDate.getDate();
          });

        return {
          photo_url: meetup.photo_url,
          name: meetup.name,
          venue: meetup.venue,
          description: meetup.description,
          yes_rsvp_count: meetup.yes_rsvp_count,
          event_url: meetup.event_url,
          time: meetup.time,
          isHoliday: isHoliday.length > 0
        };
      });
      res.json(results);
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
      const { data } = await getHolidayByCountry(country);
      console.log(data.response.holidays);
      res.json(data.response.holidays);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  // weather(for 5days forecasts)
  app.get("/api/weather/:country/:city", async (req, res) => {
    const country = req.params.country;
    const city = req.params.city;

    try {
      unirest.get(`https://community-open-weather-map.p.rapidapi.com/forecast?q=${city}%2C${country}`)
      .header("X-RapidAPI-Key", process.env.API_KEY)
      .end(function (result) {
        // console.log(result.status, result.headers);
        // console.log(result.body.list);
        let resultObject = {};
        let resultForecast = [];
        for(key in result.body.list){
          // console.log(result.body.list[key].dt_txt, result.body.list[key].weather);
          if(result.body.list[key].dt_txt.endsWith("12:00:00")){
            resultObject = {
              date: result.body.list[key].dt_txt.substr(0,10),
              wether_id: result.body.list[key].weather[0].id,
              weather_group: result.body.list[key].weather[0].main,
              description: result.body.list[key].weather[0].description,
              icon: result.body.list[key].weather[0].icon
            };
            resultForecast.push(resultObject);
          }
        }
        res.json(resultForecast);
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  })

  return app;
};

module.exports = initializeServer;
