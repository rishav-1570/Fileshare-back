const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This is the blue print how the data will be stored in database.
const fileSchema = new Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uuid: { type: String, required: true },
    sender: { type: String, required: false },
    receiver: { type: String, required: false },
}, { timestamps: true });
//timestamps -> createdAt and updatedAt fields will be added.

module.exports = mongoose.model('File', fileSchema); 
//it will be exported with name File.
