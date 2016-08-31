var userModel = require('../models/user');

var userlib = function () { };

userlib.hashPassword = function (password) {

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

userlib.save = function (userInfo) {
    var user = new userModel({
        userName: userInfo.userName,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
        location: userInfo.location,
        dateOfBirth: userInfo.dateOfBirth
    });
    user.save();
}

module.exports = userlib;