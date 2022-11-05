const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

//  Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//  Set handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Pankaj Kumar',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Pankaj Kumar',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'How can i help you?',
    title: 'Help',
    name: 'Pankaj Kumar',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided',
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  // res.send('Help article not found!');
  res.render('404', {
    title: '404',
    message: 'Help article not found.',
    name: 'Pankaj Kumar',
  });
});

app.get('*', (req, res) => {
  // res.send('My 404 Page');
  res.render('404', {
    title: '404',
    message: 'Page not found!',
    name: 'Pankaj Kumar',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
