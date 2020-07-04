const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();
const port = 3000;

const publicDir = path.join(__dirname, '/public');
console.log(publicDir);
app.use(express.static(publicDir));

app.get('/weather', (req, res) => {
  const location = req.query.loc;
  if (!location) {
    res.send('must provide the search location');
  } else {
    geocode(location, (error, { location, latitude, longitude } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forcast(latitude, longitude, (error, { current }) => {
        if (error) {
          return res.send({ error });
        }
        const result = {
          location: `Showing result for ${location}`,
          weather: `Weather prediction is ${current.weather_descriptions[0]}, and temperature will be around ${current.temperature}`,
        };
        return res.send(result);
      });
    });
  }
});

app.listen(port, () => console.log(`application running at port ${port}`));
