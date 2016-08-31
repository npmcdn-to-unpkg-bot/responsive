var express = require('express');
var auth = express.Router();
var authuser = require('../lib/userlib');

auth.get('/', function (req, res, next) {
    res.json({ message: 'Auth service' });
});

auth.post('/login', function (req, res, next) {
    var isAuthentic = authuser.authenticate(req.body.userName, req.body.password, function (result) {
        if (result && result == true) {
            //Generate the token and send it back.
            res.json({ status: 'Success', message: 'Logged in' });
        } else {
            res.json({ status: 'Failure', message: 'Invalid username or password' });
        }
    });

});
module.exports = auth;