
const request = require("request");


const forecast = ({lat, log}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4238e2b5c7f1cc6e3ee0e2d8d6de7cd9&query=${log},%20${lat}&units=f`;

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to weather services!", undefined);
        }
        else if (response.body.error) {
            callback("Incorrect position!", undefined);
        }
        else {
            console.log(response.body.current.humidity)
           //callback(undefined, {
           //    temp: response.body.current.temperature,
           //    feelsLike: response.body.current.feelslike
           //});
           callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees out. The humidity is " + response.body.current.humidity + "%."
           )}
    });
}

module.exports = forecast;
