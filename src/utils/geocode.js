const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamJhcmJhcmFuIiwiYSI6ImNrcGllcmE2NTA5OTYyb214aHI3YmZkY2sifQ.wwaZt-aIr_CjuNH6_CyWDQ&limit=1';
    
    request({url, json: true}, (error, {body}) => {
        if (error)
        {
            callback('Unable to connect to geocode services')
        }
        else if (body.features.length === 0)
        {
            callback('Unable to find location');
        }
        else
        {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
} 

module.exports = geocode