const mongoose = require('mongoose');

const { Schema } = mongoose;


const checkout = new Schema({
    imp_uid: String,
    merchant_uid: String,
    paid_amount: String,
    apply_num: String,
    buyer_email: String,
    buyer_name: String,
    buyer_tel: String,
    buyer_addr: String,
    buyer_postcode: String,
    buyer_request_message: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});




module.exports = mongoose.model('Checkout', checkout);