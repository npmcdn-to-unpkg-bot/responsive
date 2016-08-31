var userModel = require('../models/user');
var bcrypt = require('bcryptjs');

var userlib = function () { };

userlib.hashPassword = function (password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password);
    return hash;
}

userlib.authenticate = function (username, password, callback) {
    var user = userModel.findOne({ userName: username },
        function (err, user) {
            if (err) {
                callback(false);
            } else {
                if (user) {
                    var hash = this.hashPassword(password);
                    if (user.password == hash) {
                        callback(true);
                        return;
                    }
                    callback(false);
                } else {
                    callback(false);
                }

            }
        });
}

userlib.save = function (userInfo, callback) {
    var user = new userModel({
        userName: userInfo.userName,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: this.hashPassword(userInfo.password),
        location: userInfo.location,
        dateOfBirth: userInfo.dateOfBirth
    });
    user.save(callback);
}

userlib.find = function (condition, callback) {
    userModel.findOne(condition,
        function (err, user) {
            if (err) {
                callback(true);
            } else if (user) {
                callback(true);
            } else {
                callback(false);
            }
        });
}

module.exports = userlib;