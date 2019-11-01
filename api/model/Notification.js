var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
  
    idfirebase: {
        type: String,
        default: ''
    },
  
    gioTao: { // Timestamp in milisecond
        type: String,
        default: ''
    },
    nguoiTao: {
        type: String,
        default: ''
    },
    hinh: {
        type: String,
        default: ''
    },
    noiDung: {
        type: String,
        default: ''
    },
  
    chuDe: {
        type: String,
        default: ''
    },
    IsBadge: {
        type: Boolean,
        default: false
    },

},)

// NotificationSchema.pre('save', function (next) {
//     this.modifiedAt = Date.now()
//     next()
// })

mongoose.model('Notification', NotificationSchema)
