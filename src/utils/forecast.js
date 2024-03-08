const request = require("request");
require('dotenv').config();

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=f9dc5aa5c382e6dc786ff5acd1544791&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      console.log("Please provide a valid location.", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " ℃  but it feels like " +
          body.current.feelslike +
          " ℃ ."
      );
    }
  });
};

module.exports = forecast;
