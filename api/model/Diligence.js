var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DiligenceSchema = new Schema(
    {
     
        idHocSinh:{type:String},
        danhSachNgayNghi:[],
        soLuong:{type:Number}
    }
);
module.exports = mongoose.model('Diligence', DiligenceSchema)

