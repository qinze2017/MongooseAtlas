const express = require('express')
const path = require('path')
const hbs = require('hbs')
const url = require('url')
require('../src/db/mongodb')
const Product = require('../src/models/product')

const app = express()
const port = process.env.PORT

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const viewPath = path.join(__dirname, '../templates/views')
const bootstrapPath = path.join(__dirname, '../node_modules/bootstrap/dist/')
const jqueryPath = path.join(__dirname, '../node_modules/jquery/dist/')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(express.static(bootstrapPath))
app.use(express.static(jqueryPath))

app.listen(port, () => {
    console.log('Server is up on port 3000.')

})

app.get('', (req,res) => {

    // Product.find({}, (error, data) => {
    //     console.log(data)
    // })

    Product.find({}).then((values) => {
        res.render('index', {
            title: 'Products',
            products: values
        })
    })
})

app.get('/product/:id', (req, res) => {

    //console.log(req.params.id)
    //console.log(req.rawHeaders[1])
    // Product.find({ _id: req.params}, (error, data) => {
    //     console.log(data)
    // })

    Product.findById({ _id: req.params.id}).then((value) => {
        res.render('index1', {
            product: value
        })
    })
})

hbs.registerHelper('splitSizes', (sizes) => {
    //console.log(sizes)
    var values = sizes.split(',')

    return values
})
