const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app!',
        name: 'Arthur Sakemi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Arthur Sakemi'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP!',
        helpMsg: 'This is some helpful text.',
        name: 'Arthur Sakemi'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            error: 'You must provide a location'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData.forecast,
                minTemperature: forecastData.minTemperature,
                maxTemperature: forecastData.maxTemperature,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }    
    console.log(req.query.search)

    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found!',
        name: 'Arthur Sakemi'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found!',
        name: 'Arthur Sakemi'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});