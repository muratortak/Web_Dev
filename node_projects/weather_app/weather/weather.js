const request = require('request');

var getWeather = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/d7e06b12890af8ae5a7afb3f08cb6a80/${lat},${long}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect to forecast.io servers');
    } else if (response.statusCode === 404) {
      callback('Unable to fetch weather');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temp: body.currently.temperature,
        apparentTemp: body.currently.apparentTemperature
      });
    }
  });
};

module.exports.getWeather = getWeather;
