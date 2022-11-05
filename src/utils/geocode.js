const request = require('postman-request');

const api_key =
  'pk.eyJ1IjoicmVlbGluZmluaXR5IiwiYSI6ImNsOWN4YjQyNzBhNHQzdm9nb2swZGVrd3kifQ._zIkTObBxRxxq1npj2tjfg';

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${api_key}&limit=1`;

  request({ url, json: true }, (error, { body: { features } }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      const [
        {
          center: [longitude, latitude],
          place_name: location,
        },
      ] = features;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
