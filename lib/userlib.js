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
userlib.validate = function (userInfo, callback) {
    if (userInfo.userName && userInfo.userName.trim().indexOf(' ') > 0) {
        callback(false, "Username may not contain spaces");
    } else if (userInfo.email && userInfo.email.trim().indexOf(' ') > 0) {
        callback(false, "Email may not contain spaces");
    } else if(userInfo.email) {
        this.find({email: userInfo.email},function(err){
            if(err){
                callback(true,"Email already exists");
            }
        });
    } else if(!userInfo.password){
        callback(true,"Password may not be empty");
    }
}

userlib.save = function (userInfo, callback) {
    var thislib = this;
    this.find({ userName: userInfo.userName }, function (err) {
        if (err) {
            return "User already exists";
        } else {
            thislib.validate(userInfo, function (isInvalid, msg) {
                if (isInvalid) {
                    callback(true, msg);
                    return;
                }
                var user = new userModel({
                    userName: userInfo.userName,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    password: thislib.hashPassword(userInfo.password),
                    location: userInfo.location,
                    dateOfBirth: userInfo.dateOfBirth
                });
                user.save(callback);
            });
        }
    })

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