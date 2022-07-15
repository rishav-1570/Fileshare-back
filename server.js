require('dotenv').config();
const express = require('express'); //add module express
const app= express(); // express is a function and return an object in app variable.
const path = require('path');

const PORT = process.env.PORT || 3000; //if we have PORT no. in env otherwise run on port 3000
//it is the middleware of express we need to tell where are our static files located.
//here we have css in public folder.
app.use(express.static('public'));
//this is also a middleware to parse json data .
//this is needed when we destructure the req.body in routes/files.js
app.use(express.json());

const connectDB = require('./config/db');
connectDB();

//Template engine
// It will join the path and create url.
// it will tell where all the html files are stored.
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


//Routes
// from here we will route the url to another file
//1. '/api/files' type url will be route to ./routes/files.js 
app.use('/api/files', require('./routes/files')); 
app.use('/files' , require('./routes/show'));
app.use('/files/download' , require('./routes/download'));


app.listen(PORT,()=>{
    // backticks ES6 feature for dynamic strings.
    console.log(`Listening on port ${PORT}.`);
})

