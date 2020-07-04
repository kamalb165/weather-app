const request = require('request');

const geocode = (location, callback) => {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoia2FtYWxiMTY1IiwiYSI6ImNrYzVvdnR3czAzOWUyeHBodDY3NjZlZWIifQ.UUSQXtrQFDDRlbxoaqLt4A&limit=1`;

  request.get({ url: geoUrl, json: true }, (error, { body }) => {
    if (error) {
      callback('Server not reachable !!', undefined);
    } else if (!body.features[0]) {
      callback('Location not found !!', undefined);
    } else {
      // console.log(JSON.parse(response.body).features[0]);
      // callback(undefined, JSON.parse(response.body).features[0]);
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
