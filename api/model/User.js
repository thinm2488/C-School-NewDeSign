var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema(
  {
    idTao: { type: String },
    tenNguoiDung: { type: String },
    androidToken: {
      type: String,
      default: ''
    },
    email: { type: String },
    quanHe: [{
      id:{type:String},
      tenHocSinh: { type: String },
      maSoHocSinh: { type: String },
      gioiTinh: { type: String },
      ngaySinh: { type: String },
      queQuan: { type: String },
      soHieu: { type: String },
      diaChi: { type: String },
      khoi: { type: String },
      hinh: { type: String, default: "hero-bg.jpg" }, 

      // test xamarin
      tenTruong: { type: String, default: "THCS Tri Tôn - An Giang" }, 

    }],
    soDienThoai: { type: String },
    password: { type: String,default:'123456' },

    role: { type: String, default: 'ph' },
    hinh: { type: String, default: "hero-bg.jpg" }



  }

);
module.exports = mongoose.model('User', UserSchema)