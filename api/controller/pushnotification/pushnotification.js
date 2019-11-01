var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var User = mongoose.model('User')
// var constants = require('../../../configs/constants')
var android= require('../pushnotification/android')
//var common = require('../common')


const Notification = mongoose.model('Notification')




// function sendNotificationForBirthday (user) {
//     return new Promise((resolve, reject) => {
//       var message = constants.BIRTHDAY_NOTIFICATION
//       sendNotification(user, message)
//       return resolve()
//     })
//   }
  // async function sendNotifications ( message, type) {
  //   let users = await User.find({ role: 'ph' },
  //     { code: 1, androidToken: 1 })
  //   android.sendNotification(users.map(u => u.androidToken).filter(Boolean), message, type)
  //   //ios.sendNotification(users.map(u => u.iosToken).filter(Boolean), message, type)
  // }
async function sendNotifications ( message, nguoiTao) {
   
  let users = await User.find({role:'ph'}
    )
    
    android.sendnoti(users.map(u => u.androidToken), message,nguoiTao)
         
  }
module.exports = {
    
    // sendNotificationForBirthday: sendNotificationForBirthday,
    sendNotifications: sendNotifications,
  
  }