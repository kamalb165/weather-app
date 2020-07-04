const request = require('request');

const forcast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5d9a50eaa4dd451e106e03b70e7d7945&query=${latitude},${longitude}`;
  request.get({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Weather Server not Available !!', undefined);
    } else if (body.error) {
      callback('location not found', undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = forcast;
