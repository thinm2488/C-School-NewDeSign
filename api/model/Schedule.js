var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ScheduleSchema = new Schema(
    {
       
        listMonHoc:[
            {
            idMonHoc:{ type:String },

            tenMonHoc:{type:String},

            thoiGianBatDau:{type:String},

            thoiGianKetThuc:{type:String},
            
            ngayHoc:{type:String}
            }
        ],
        ngayBatDau:{type:String},
        ngayKetThuc:{type:String},
        soHieu:{type:String},
        giaoVienCN:{type:String},
       

    }
);
module.exports = mongoose.model('Schedule',ScheduleSchema)

