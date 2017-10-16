const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather')

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
var lat = '';
var long ='';
geocode.geocodeAddress(argv.address, (errorMessage, results)=> {
  if(errorMessage){
    console.log(errorMessage);
  }else{
    console.log(JSON.stringify(results, undefined, 2));
    lat = results.latitude;
    long = results.longtitude;

    weather.getWeather(lat, long, (errorMessage, weatherResults)=>{
      if(errorMessage){
        console.log(errorMessage);
      }else{
        console.log(`It's currently: ${weatherResults.temp}`);
      }
    });
  }
});



//d7e06b12890af8ae5a7afb3f08cb6a80
