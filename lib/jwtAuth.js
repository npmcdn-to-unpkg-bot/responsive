var userLib = require('./userlib');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = function (req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['authorization'];

    if (token) {
        if(token.indexOf('Bearer') !== -1)
            token = token.split(' ')[1];
        try {
            var decoded = jwt.decode(token, config.secret);
            userLib.find({ id: decoded.iss }, function (err, user) {
               req.user = user; 
            });
        } catch (err) {
            return next();
        }
    } else {
        return next();
    }
}