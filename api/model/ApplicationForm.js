var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ApplicationFormSchema = new Schema(
    {
       
        idHocSinh:{type:String},
        tenHocSinh:{type:String},
        soHieu:{type:String},
        lyDo:{type:String},
        ngayBatDau:{type:Number},
        ngayKetThuc:{type:Number},
        tenPhuHuynh:{type:String},
        idPhuHuynh:{type:String},
        trangThai:{type:Boolean, default:false},
        ngayGui:{type:Number},
        emailGiaoVien:{type:String},
        soNgayNghi:{type:String},
        lyDoTuChoi:{type:String}
    }
);
module.exports = mongoose.model('ApplicationForm',ApplicationFormSchema)

