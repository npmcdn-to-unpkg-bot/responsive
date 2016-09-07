var express = require('express');
var auth = express.Router();
var authuser = require('../lib/userlib');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

auth.get('/', function (req, res, next) {
    res.json({ message: 'Auth service' });
});

auth.post('/login', function (req, res, next) {
    var isAuthentic = authuser.authenticate(req.body.userName, req.body.password, function (err, user, result) {
        if (result && result == true) {
            if (user) {
                //Generate the token and send it back.
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 10080 //in seconds
                });
                res.json({ success: true, token: 'JWT ' + token });
            }
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    });

});
module.exports = auth;