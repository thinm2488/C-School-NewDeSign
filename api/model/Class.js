var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassSchema = new Schema({
  
   
    khoi:{type:String},
   soHieu:{type:String},
   idGVCN:{type:String},
   idGVMon:[
       {
           id:{type:String},
           mon:{type:String},
           tenGV:{type:String}
        }
    ]
   

},)

// NotificationSchema.pre('save', function (next) {
//     this.modifiedAt = Date.now()
//     next()
// })

mongoose.model('Class', ClassSchema)
