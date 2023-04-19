const express = require('express');
const courseRoutes = require('./routes/courses.routes')
const articlesRoutes = require('./routes/articles.routes')
const categoriesRoutes = require('./routes/categories.routes')
/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads the form's input 
 * and store it as a javascript object
 */ 
const bodyParser = require('body-parser')


const app = express();


/**
 * bodyParser.urlencoded() parses the text as URL encoded data 
 * (which is how browsers tend to send form data from regular forms set to POST) 
 * and exposes the resulting object (containing the keys and values) on req. body.
 */ 
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.json());
app.use(express.static('public'))





app.set('views','templates')
app.set('view engine','ejs')

app.use(courseRoutes)
app.use(articlesRoutes)
app.use(categoriesRoutes)



let sayHello='hello word';

app.get('/', (req, res) => {
    //to use api we use .send
    // res.send("welcome to my home page")


    //to use localtemplate we use .render 
    // res.render("commun/home.pug",{
    //     hello:sayHello
    // })
 
})



app.listen(5000, () => {
    console.log("The serve is running")
})

