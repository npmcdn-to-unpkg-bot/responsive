var mongoose = require('mongoose');
var database = require('../config/database');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: String,
    dateOfBirth: String
});

var userModel = mongoose.model('Users',userSchema);

module.exports = userModel;