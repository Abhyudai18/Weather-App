const request = require("request");
require('dotenv').config();


const geocode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=360dccd5b1f1b464b770e9415ecc9498&query=" +
    encodeURIComponent(address); //encodeURI is for special characters

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.data === undefined || body.data.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].label,
      });
    }
  });
};

module.exports = geocode;
