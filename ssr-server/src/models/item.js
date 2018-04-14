const mongoose = require('mongoose');

const {Schema} = mongoose;


const item = new Schema({
    title: String,
    body: String,
    price: Number,
    imageNames: String,
    publishedDate: {
        type: Date,
        default: new Date()
    }
});




module.exports = mongoose.model('Item', item);
