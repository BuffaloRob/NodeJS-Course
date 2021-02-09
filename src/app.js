const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine & views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title:'Weather App',
    name: 'Rob Peckham'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title:'About',
    name: 'Rob Peckham'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This is just something I am playing around with so please look for help in another app',
    name: 'Rob Peckham'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, weatherData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        forecast: weatherData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Rob Peckham'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'My 404 page',
    name: 'Rob Peckham'
  })
})

app.listen(port, () => {
  console.log(`server is up on port ${port}`)
})
