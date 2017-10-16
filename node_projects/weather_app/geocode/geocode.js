const request = require('request');


var geocodeAddress = (address, callback) => {
  var add = encodeURIComponent(address);
  console.log(add);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${add}`,
    json: true
  }, (error, response, body)=>{
    if(error){
      callback("Unable to connect to Google servers.");
    }else if(body.status === 'ZERO_RESULTS'){
      callback("Unable to find the address.");
    }else if(body.status === 'OK'){
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude:body.results[0].geometry.location.lat,
        longtitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
