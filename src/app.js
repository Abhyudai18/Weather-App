const path = require("path"); // core node module
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public"); //__dirname, __filename provided by node
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars and partials engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Abhyudai Singh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Abhyudai Singh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help!",
    name: "Abhyudai Singh",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a valid address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    Error: "Error! Missing article",
    name: "Abhyudai Singh",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    Error: "404",
    name: "Abhyudai Singh",
  });
});

app.listen(3000, () => {
  console.log("Server is up is on port 3000");
});

//(req, res) -> callback
//hbs should be inside views(in this case templates) folder located in the root of the project
//{ latitude, longitude, location } = {} we will not get error because the value is set to default otherwise the value of object can be undefined and we cannot destructure undefined values
