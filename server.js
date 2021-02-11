const express = require('express');
let request = require("request");
const axios = require('axios');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

require('dotenv').config();

let token = process.env.TOKEN;
let key = process.env.KEY;


const whitelist = ['http://localhost:3000'​, 'http://localhost:5000'​, 'https://weather-yelp.herokuapp.com/'​]
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

app.get("/places/:location", (req, res) => {
    let location = req.params.location;
    axios.get(`https://api.yelp.com/v3/businesses/search?limit=6&term=Museums&location=${location}` ,{
      headers: {
        Authorization: `Bearer ${token}`
    }}).then(response => {
      res.json(response.data)
    })
})

app.get("/weather/:location", (req, res) => {
    let location = req.params.location;
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?${location}&appid=${key}&units=imperial`).then(response => {
      res.json(response.data)
    })
})

app.get("/currentweather/:location", (req, res) => {
    let location = req.params.location;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?${location}&appid=${key}&units=imperial`).then(response => {
      res.json(response.data)
    })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));