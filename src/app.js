
const path = require("path")
const express = require("express")
const hbs = require ("hbs")

const geocode = require("./utils/geocode");
const forecast= require("./utils/forecast");

//console.log(__dirname)
//console.log(path.join(__dirname, "../public"))

const app = express()

// Define paths for Express config
const publicDir    = path.join(__dirname, "../public")
const viewsPath    = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


// Setup handlebars engine and views locaiton 
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)
    

// Setup static directory to serve
app.use(express.static(publicDir))


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name : "Andrew Mead"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name : "Andrew Mead"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        help_message: "Please help me to learn NODE JS",
        title: "Help",
        name : "Andrew Mead"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "You must provide an address term"
        })
        return
    }


    geocode(req.query.address, (error, data = "London") => {
        if (error) {
            res.send({
                myError: "Error from geocode service",
                error
            })
            return
        }
        //console.log("Got the address " + req.query.address)
        forecast(data, (error, forecastData) => {
            if (error) {
                res.send({
                    myError: "Error from forcast service",
                    error
                })
                return
            }
            //console.log(data.loc);
            //console.log(forecastData);
            let tempData = {
                temp: forecastData,
                location: data,
                address: req.query.address
            }
            res.send(tempData)
        });
    });

})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query)
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("page_404", {
        message_404: "Help article not found",
        title: "Help Article",
        name : "Andrew Mead"
    })
})

app.get("*", (req, res) => {
    res.render("page_404", {
        message_404: "Page not found",
        title: "404 Page",
        name : "Andrew Mead"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")

})


