
const request = require("request");

const geocode = (address, callback) => {
    const url_map_box = "http://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoicm9uZXRlIiwiYSI6ImNrZGNiM285bzNuYzEyeHF2MWJuaWJ2OGYifQ.6zy4UdaOyGOfNvC94u6jmQ&limit=1"

    request({url: url_map_box, json: true}, (error, response) => {
        if (error) {
            callback("Uncable to connect to location services!", undefined);
        }
        else if (response.body.features.length === 0) {
            callback("Unable to find location. Try another search!", undefined);
        }
        else {
            callback(undefined, {
                lat : response.body.features[0].center[0],
                log : response.body.features[0].center[1],
                loc : response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;
