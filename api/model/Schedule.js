var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ScheduleSchema = new Schema(
    {
       
        ngayBatDau:{ type: String, default: ""},
        ngayKetThuc:{ type: String, default: ""},
        soHieu:{ type: String, default: ""},
        giaoVienCN:{ type: String, default: ""},
       thuhai:{
           listmonhoc:[
              
        ]
          
       },
       thuba:{
        listmonhoc:[]
       
    },  thutu:{
        listmonhoc:[]
       
    },  thunam:{
        listmonhoc:[]
       
    },  thusau:{
        listmonhoc:[]
       
    },  thubay:{
        listmonhoc:[]
       
    },

       

    }
);
module.exports = mongoose.model('Schedule',ScheduleSchema)

