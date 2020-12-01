const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/gecode.js')
const forcast = require('../utils/forcast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})
 
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You Must Provide a search term'
        })
    }

    geocode (req.query.address,async (error2,{lat,lon,location}={})=>{
        
        if(error2){
            return res.send({
                error2
            })
        }
        forcast(lon,lat,(error1,data1)=>{
            if(error1){
                return res.send({
                    error1
                })
            }
                res.send({
                    location:data1.name,
                    Temperature: data1.main.temp,
                    Country:location,
                    
                })
            })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('/product',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'You Must Provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})



app.listen(port, () => {
    console.log('Server is up on port '+port)
})