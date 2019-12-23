const admin = require('../firebaseController')

// const constants = require('../../../configs/constants')

// function sendNotification (token, str, type) {
//   if (!token || !token.length) return
//   let message = {
//     android: {
//       notification: {
//         title: 'C-School',
//         body: str,
//         color: '#f45342'
//       },
//       data: {
//         type: type
//       }
//     },
//     token: 'eSiq5n1Rjqs:APA91bF_RJwr_zk0fge3fvH4_m4e0dnFoLfQsP-xt8thzhfp1MBN5bEjHTU2V5z0Id7KAh-HTAkoJTBZM6N97BTmtsUi32mVo5wwSaDTAbK6dOyNtQt-ijdvAcFYEIdvhMlhMhRKLVdZ'
//   }
//   // if (documentID && type === constants.notificationType.NEW_DOCUMENT) {
//   //   message.android.data.documentId = documentID
//   // } else if (documentID && type === constants.notificationType.NEW) {
//   //   message.android.data.billId = documentID
//   // }
//   try {
//     if (typeof token === 'string') {
//       message.token = 'eSiq5n1Rjqs:APA91bF_RJwr_zk0fge3fvH4_m4e0dnFoLfQsP-xt8thzhfp1MBN5bEjHTU2V5z0Id7KAh-HTAkoJTBZM6N97BTmtsUi32mVo5wwSaDTAbK6dOyNtQt-ijdvAcFYEIdvhMlhMhRKLVdZ'
//       admin.messaging().send(message).catch(reject => console.log(reject))
//     } else {
//       message.token = 'eSiq5n1Rjqs:APA91bF_RJwr_zk0fge3fvH4_m4e0dnFoLfQsP-xt8thzhfp1MBN5bEjHTU2V5z0Id7KAh-HTAkoJTBZM6N97BTmtsUi32mVo5wwSaDTAbK6dOyNtQt-ijdvAcFYEIdvhMlhMhRKLVdZ'
//       admin.messaging().sendToDevice(message.token, message.android).catch(reject => console.log(reject))
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }
var FCM = require('fcm-node');
var serverKey = 'AIzaSyA3CE-n8z68M8wYvpJGVvOt8SxnI1z5M24'; //put your server key here
var fcm = new FCM(serverKey);

function sendnoti(token, str, nguoiTao){

  for(var i=0;i<=token.length;i++){
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      //to: token, //single device
      //collapse_key: 'your_collapse_key',
      to: token[i], //single device
      notification: {
          title: nguoiTao.user.tenNguoiDung, 
          body: str.noiDung ,
          tag:str.idfirebase,

      },
      
      
     
  };
  
  fcm.send(message, function(err, response){
      if (err) {
          console.log("Something has gone wrong!");
      } else {
          console.log("Successfully sent with response: ", response);
      }
  });
  }
  
}
var moment = require('moment')
function sendnotidayoff( str,data){
 let ngaynghi
   if(str.dayoff.ngayBatDau==str.dayoff.ngayKetThuc){
    ngaynghi=moment( str.dayoff.ngayBatDau-86400000).format("DD/MM/YY")
   }
   else{
    ngaynghi=moment( str.dayoff.ngayBatDau-86400000).format("DD/MM/YY")+" đến "+moment(str.dayoff.ngayKetThuc-86400000).format("DD/MM/YY");

   }
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      //to: token, //single device
      //collapse_key: 'your_collapse_key',
      to: data.user.androidToken, //single device
      notification: {
          title: "Yêu Cầu Xin nghỉ Phép", 
          body: "Yêu cầu xin nghỉ phép ngày "+ngaynghi+" đã được duyệt!" ,
          tag: str.dayoff.id,

      },
      
      
     
  };
  
  fcm.send(message, function(err, response){
      if (err) {
          console.log("Something has gone wrong!");
      } else {
          console.log("Successfully sent with response: ", response);
      }
  });
  
  
}
function sendnotideny( str,data){
  let ngaynghi
    if(str.dayoff.ngayBatDau==str.dayoff.ngayKetThuc){
     ngaynghi=moment( str.dayoff.ngayBatDau).format("DD/MM/YY")
    }
    else{
     ngaynghi=moment( str.dayoff.ngayBatDau).format("DD/MM/YY")+" đến "+moment(str.dayoff.ngayKetThuc).format("DD/MM/YY");
 
    }
     var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
       //to: token, //single device
       //collapse_key: 'your_collapse_key',
       to: data.user.androidToken, //single device
       notification: {
           title: "Từ chối yêu cầu nghỉ Phép", 
           body: "Yêu cầu xin nghỉ phép ngày "+ngaynghi+" không được duyệt. Vì lý do:"+str.lydo+" " ,
           tag: str.dayoff.id,
 
       },
       
       
      
   };
   
   fcm.send(message, function(err, response){
       if (err) {
           console.log("Something has gone wrong!");
       } else {
           console.log("Successfully sent with response: ", response);
       }
   });
   
   
 }
 
module.exports = {
  //sendNotification: sendNotification,
  sendnoti:sendnoti,
  sendnotidayoff:sendnotidayoff,
  sendnotideny:sendnotideny
}
