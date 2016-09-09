var express = require('express');
var auth = express.Router();
var authuser = require('../lib/userlib');
var config = require('../config/config');

auth.get('/', function (req, res, next) {
    res.json({ message: 'Auth service' });
});

auth.post('/login', function (req, res, next) {
    var isAuthentic = authuser.authenticate(req.body.userName, req.body.password, function (err, user, result) {
        if (result && result == true) {
            if (user) {
                user.password = "";
                var token = authuser.getToken(user);
                res.json({ success: true, user: user, token: token });
            }
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    });

});
module.exports = auth;