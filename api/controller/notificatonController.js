

const mongoose = require('mongoose')

const Notification = mongoose.model('Notification')
//const User = mongoose.model('User')
// const constants = require('../../configs/constants')
const async = require('async')
var android = require('../controller/pushnotification/android')
var pushnotiController=require('../controller/pushnotification/pushnotification')
var Teacher = mongoose.model('Teacher')




const createNotification = async function (data, idfirebase,nguoiTao) {

    noti = new Notification(data);
    noti.idfirebase=idfirebase.idFirebase
    
    await noti.save();
    
    //sendNotification (token, data.noiDung,constants.notificationType.NEW_DOCUMENT)
    pushnotiController.sendNotifications(noti,nguoiTao)
//sendNotification(noti,type)
    return {
        noti
    }

}

// async function sendNotifications (roles, message, type) {
//     let users = await User.find({ role: roles },
//       { code: 1, androidToken: 1})
//     android.sendNotification(users.map(u => u.androidToken).filter(Boolean), message, type)
//   }
// function sendNotificationForTest (token, data) {
//     sendNotification(token='', data, 'type of notification')
//   }
// function sendNotification (token, message) {
//     if (!token || !message || !type) return
//     if (token) {
//       android.sendnoti(token, message, type)
//     }
   
//   }
const editNotification = async function (data) {
    let noti = await Notification.findOne({ idfirebase: data.idfirebase });

    
    if (data.nguoiTao) {
        noti.nguoiTao = data.nguoiTao;
    }
    if (data.chuDe) {
        noti.chuDe = data.chuDe;
    }
    if (data.noiDung) {
        noti.noiDung = data.noiDung;
    }
    if (data.gioTao) {
        noti.gioTao = data.gioTao;
    }
    if (data.hinh) {
        noti.hinh = data.hinh;
    }
    

    await noti.save();
    return { noti }

}
const laynoti = async function () {
    let listnoti = await Notification.find().sort({"gioTao":-1});
    return {
        listnoti
    }

}
const layChiTietNoti = async function (id) {
    let noti = await Notification.findOne({_id:id});
    return {
        noti
    }

}
const xoanoti = async function (id) {
    let noti = await Notification.findOne({ idfirebase: id });
    let users= await Teacher.findOne({_id:noti.nguoiTao})
    noti.remove();
    return {
        mess:'Xóa thành công!',
        users
    }
}
module.exports = {
    laynoti: laynoti,
    layChiTietNoti:layChiTietNoti,
    editNotification:editNotification,
    xoanoti:xoanoti,
    createNotification: createNotification,

}
