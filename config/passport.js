const config = require('./db');
const User = require('../models/user');
const Admin = require('../models/user');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ id: jwt_payload.sub }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
        Admin.findOne({ id: jwt_payload.sub }, (err, admin) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, admin);
            } else {
                return done(null, false);
            }
        });
    }));
}