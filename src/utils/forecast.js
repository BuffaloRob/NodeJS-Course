const request = require('postman-request')

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f7af6f4de6618a29ba1a0b4a550cc52b&query=${long,lat}&units=f`

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const current = body.current
      callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees F out. It feels like ${current.feelslike} degrees F out. This wind speed is ${current.wind_speed} mph in the ${current.wind_dir} direction.`)
    }
  })
}


module.exports = forecast