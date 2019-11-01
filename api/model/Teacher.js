var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TeacherSchema = new Schema(
    {
        idTao:{type:String},
        idGV:{type:String},
        tenNguoiDung: { type: String },
        soDienThoai: { type: String },
        password: { type: String,default:"123456" },
        role:  { type: String, default:'gv' },
        hinh:{type:String,default:"hero-bg.jpg"},
        mon:{type:String},
        email:{type:String},
        GVCN:{type:String},
        lopDay:[      ]
        
        

    }
);
module.exports=mongoose.model('Teacher',TeacherSchema)