const path = require("path"); 
require('dotenv').config(); // imorting dotenv module and call method config().
//console.log("uu"+process.env.MONGO_CONNECTION_URL);
// this link we got from mongodb atlas.


const mongoose = require('mongoose'); //import module mongoose
function connectDB() {
    // Database connection  template 
    //process.env.variable_name : environment variables ,to be secured.
    mongoose.connect(process.env.MONGO_CONNECTION_URL);
    const connection = mongoose.connection;
 
    //just like event listner 
    connection.once('open', () => {
        console.log('Database connected.');
    }).on('error',err => {
        console.log('Connection failed.');
    });
}



module.exports = connectDB; // export function connectDB
