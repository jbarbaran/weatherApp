const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=966062398086fe2d2a16ea86c103d9c9&query='+ latitude +','+longitude+ '&units=m';
    request({url, json: true}, (error, {body}) => {
        if (error)
        {
            callback('Unable to connect to weather service')
        } 
        else if (body.success === false && body.error.code === 601)
        {
            callback('Unable to find location');
        }
        else if (body.success === false)
        {
            callback('Unkown error. Code:' + body.error.code)
        }
        else
        {
            callback(undefined, {
                location: body.location.name,
                weather_description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                uv_index: body.current.uv_index
            })
        }
    });
}

module.exports = forecast