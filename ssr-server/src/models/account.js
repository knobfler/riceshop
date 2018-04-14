const mongoose = require('mongoose');
const crypto = require('crypto');
const { generateToken } = require('lib/token');


const {Schema} = mongoose;

function hash(password) {
    return crypto
        .createHmac('sha256', process.env.SECRET_KEY)
        .update(password)
        .digest('hex');
}

const account = new Schema({
    userID: String,
    userName: String,
    userEmail: String,
    userPassword: String,
    userPostAddress: String,
    userPostCode: String,
    userDetailAddress: String,
    createdAt: {
        type: Date,
        default: new Date()
    }

});

account.statics.findByUserID = function(userID) {
    return this.findOne({'userID': userID}).exec();
}

account.statics.localRegister = function ({
    userID,
    userName,
    userEmail,
    userPassword,
    userPostAddress,
    userPostCode,
    userDetailAddress
}) {
    const account = new this({
        userID,
        userName,
        userEmail,
        userPassword: hash(userPassword),
        userPostAddress,
        userPostCode,
        userDetailAddress
    });
    return account.save();
}

account.methods.generateToken = function() {
    const payload = {
        _id: this._id,
        userID: this.userID
    };
    return generateToken(payload, 'account');
}

account.methods.validatePassword = function(password) {
    const hashed = hash(password);
    return this.userPassword === hashed;
};

module.exports = mongoose.model('Account', account);
