// var admin = require("firebase-admin");

// var serviceAccount = require("../../configs/c-school-apps-firebase-adminsdk-z3osd-9b5c9dbae7.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://c-school-apps.firebaseio.com"
// });
var firebase=require('firebase')
var moment=require('moment')
//listenFirebase();
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const insertfirebase = async function (data,nguoiTao) {

  var _id = makeid(15);
  var dbRef = firebase.database().ref();
  var dbNoti = dbRef
  
      .child("notifications/" + data.nguoiTao + "/" + _id);
  dbNoti.set({
      _id:_id,
      ngaytao: data.gioTao,
      nguoiTao:nguoiTao.user.tenNguoiDung,
      hinh: data.hinh,
      noiDung: data.noiDung,
      chuDe:data.chuDe,
      IsBadge: false,

  });
  return{
    idFirebase :_id
  }
 
}
const insertnoti = async function (data,giaoVien) {
  let ngaynghi
  if(data.dayoff.ngayBatDau==data.dayoff.ngayKetThuc){
   ngaynghi=moment( data.dayoff.ngayBatDau).format("DD/MM/YY")
  }
  else{
   ngaynghi=moment( data.dayoff.ngayBatDau).format("DD/MM/YY")+" đến "+moment(data.dayoff.ngayKetThuc).format("DD/MM/YY");

  }
if(data.dayoff.lyDoTuChoi){
  var dbRef = firebase.database().ref();
  var dbNoti = dbRef
  
      .child("notifications/" + giaoVien.id + "/" + data.dayoff.id);
  dbNoti.set({
      _id: data.dayoff.id,
      chuDe:"Yêu Cầu xin phép",
      noiDung:"Yêu cầu xin nghỉ phép ngày "+ngaynghi+" đã bị từ chối với lý do "+data.dayoff.lyDoTuChoi+"",
      ngaytao: data.dayoff.ngayGui,
      nguoiTao:giaoVien.tenNguoiDung,
      hinh: giaoVien.hinh,
      IsBadge: false,
  });
}else{
  var dbRef = firebase.database().ref();
  var dbNoti = dbRef
  
      .child("notifications/" + giaoVien.id + "/" + data.dayoff.id);
  dbNoti.set({
      _id: data.dayoff.id,
      chuDe:"Yêu Cầu xin phép",
      noiDung:"Yêu cầu xin nghỉ phép ngày "+ngaynghi+" đã được duyệt!",
      ngaytao: data.dayoff.ngayGui,
      nguoiTao:giaoVien.tenNguoiDung,
      hinh: giaoVien.hinh,
      IsBadge: false,
  });
}

  
}
const updatefirebase = async function (data,nguoiTao) {


  var dbRef = firebase.database().ref();
  var dbNoti = dbRef
  
      .child("notifications/" + data.nguoiTao + "/" + data.idfirebase);
  dbNoti.set({
      _id:data.idfirebase,
      ngaytao: data.gioTao,
      noiDung: data.noiDung,
      chuDe:data.chuDe,
      IsBadge: false,
      nguoiTao: nguoiTao.user.tenNguoiDung,
      hinh: data.hinh,
  });
  return{
    idFirebase :data.idfirebase
  }
 
}
const deletefirebase = async function (user,id) {

  var dbRef = firebase.database().ref();
  dbRef .child("notifications/" +   user.id + "/"+ id).remove();
}
const insertaccount = async function (data,giaoVien) {


  var dbRef = firebase.database().ref();
  var dbNoti = dbRef
  
      .child("chats/" + data.user.idTao + "/users/" + data.user.id);
  dbNoti.set({
      id:data.user.id,
      emailGV:giaoVien.user.email,
      tenNguoiDung: data.user.tenNguoiDung,
      idTao:data.user.idTao,
      hinh: data.user.hinh,
      role: data.user.role,
      soDienThoai:data.user.soDienThoai,
    

  });
  
 
}

module.exports = {
  insertfirebase:insertfirebase,
  updatefirebase:updatefirebase,
  deletefirebase:deletefirebase,
  insertnoti:insertnoti,
  insertaccount:insertaccount
}