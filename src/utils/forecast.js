const request = require('postman-request');
const api_key = '914f024ac8f3bac3b09119024218d6e3';

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body: { current, error_ } }) => {
    if (error) {
      //  Low Level Error
      callback('Unable to connect to weather service!', undefined);
    } else if (error_) {
      callback('Unable to find location', undefined);
    } else {
      const {
        weather_descriptions: [description],
        temperature,
        feelslike,
        humidity,
      } = current;
      callback(
        undefined,
        `${description}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The humidity is ${humidity}%.`
      );
    }
  });
};

module.exports = forecast;
