var userLib = require('./userlib');
var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['authorization'];
    if (token) {
        try {
            var decoded = jwt.decode(token, app.get('jwtSecret'));
        } catch (err) {
            return next();
        }
    }else{
        return next();
    }
}