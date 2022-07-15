const path = require("path"); 
require('dotenv').config(); // imorting dotenv module and call method config().
//console.log("uu"+process.env.MONGO_CONNECTION_URL);
// this link we got from mongodb atlas.
const MONGO_CONNECTION_URL="mongodb+srv://file-sharing:Filesharing123@cluster0.miaytoh.mongodb.net/filedb?retryWrites=true&w=majority";

const MONGO_CONNECTION_URL1="mongodb+srv://inShare:jhj6fwXZejlmhgGK@cluster0.jxt6ett.mongodb.net/inShare?retryWrites=true&w=majority";

const mongoose = require('mongoose'); //import module mongoose
function connectDB() {
    // Database connection  template 
    //process.env.variable_name : environment variables ,to be secured.
    mongoose.connect(MONGO_CONNECTION_URL);
    const connection = mongoose.connection;
 
    //just like event listner 
    connection.once('open', () => {
        console.log('Database connected.');
    }).on('error',err => {
        console.log('Connection failed.');
    });
}



module.exports = connectDB; // export function connectDB
