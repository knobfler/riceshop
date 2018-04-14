const mongoose = require('mongoose');

const {Schema} = mongoose;


const alert = new Schema({
    title: String,
    body: String,
    publishedDate: {
        type: Date,
        default: new Date()
    }
});




module.exports = mongoose.model('Alert', alert);
