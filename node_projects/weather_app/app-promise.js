const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias : 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;
  var add = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${add}`

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
      throw new Error('unable to find that address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var long = response.data.results[0].geometry.location.lng;;
  var weatherUrl = `https://api.darksky.net/forecast/d7e06b12890af8ae5a7afb3f08cb6a80/${lat},${long}`
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temp = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`it is currently follow by the ${temp}. It feels like ${apparentTemperature}`);
}).catch((error) => {
  if(error.code === 'ENOTFOUND') {
    console.log('unable to connect!');
  } else {
    console.log(error.message);
  }
});
//d7e06b12890af8ae5a7afb3f08cb6a80
