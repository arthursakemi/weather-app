const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const coordinates = latitude + ',' + longitude;
    const url = 'https://api.darksky.net/forecast/939b54d738c98b50d97df20804b6f23a/' + coordinates + '?units=si';

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to forecast service!', undefined);
        } else if(body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    });

};

module.exports = forecast; 