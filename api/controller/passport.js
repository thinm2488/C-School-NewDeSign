var passport = require('passport')
var mongoose = require('mongoose')

var User = mongoose.model('User')
// var constants = require('./constants')
var jwt = require('jsonwebtoken')

//const authController = require('../controllers/authController')
var LocalStrategy = require('passport-local').Strategy

//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

function createPassportConfig (app) {
  passport.use(new LocalStrategy(
    {
      usernameField: 'soDienThoai',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, soDienThoai, password, done) {
      User.findOne({ soDienThoai: soDienThoai }).exec(function (err, user) {
        if (err) {
          return done(responseStatus.Code500(), false)
        }
        if (!user) {
          return done(responseStatus.Code404({ errorMessage: 'Nhập sai email hoặc password'}), false)
        }
        if (!user.authenticate(password)) {
          return done(responseStatus.Code401({ errorMessage:'Nhập sai email hoặc password'}), false)
        }
        var token = jwt.sign({ soDienThoai: user.soDienThoai }, config.secret, {
          expiresIn: config.expireIn
        })

        return done(null, true, {
          user: user,
          token: token
        })
      })
    }))

//   passport.use(new GoogleStrategy(
    
//     {
//       clientID: '517376694664-j0im7pbd67jc8pouvrbjann1g6t084ci.apps.googleusercontent.com',
//       clientSecret: 'Qtp4JS_yhSewT_NcfEQg6zvr',
//       callbackURL: 'http://localhost:3000/user/signin/callback'
//     },
//     function (req, accessToken, refreshToken, profile, done) {
//       User.findOne({ providerId: profile.id }, async function (err, user) {
//         if (err) { return done(err) }
//         if (user) {
//           var token = jwt.sign({ email: profile.emails[0].value }, config.secret, {
//             expiresIn: config.expireIn
//           })
//           return done(null, true, {
//             user: user,
//             token: token
//           })
//         }
//         if (!user) {
//           let newUser = {
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             providerId: profile.id,
//             avatarURL: profile.photos[0].value,
//             provider: 'google'
//           }
//           let dataReturn = await authController.signUpForSocial(newUser)
//           done(null, user, dataReturn)
//         }
//       })
//     }
//   ))

  passport.serializeUser(function (user, cb) {
    cb(null, user)
  })

  passport.deserializeUser(function (user, cb) {
    User.findOne({ email: user.email }, function (err, user) {
      if (err) { return cb(err) }
      cb(null, user)
    })
  })

  app.use(passport.initialize())
  app.use(passport.session())
}

module.exports = {
  createPassportConfig: createPassportConfig,
  passport: passport
}