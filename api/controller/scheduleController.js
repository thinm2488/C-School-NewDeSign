const mongoose = require('mongoose');
const Schedule = mongoose.model('Schedule');
// const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const getschedule = async function (data) {
   
    
    
    let schedule = await Schedule.findOne({ soHieu:data.student.soHieu });
    let TKB
   
    if (schedule.ngayKetThuc<=schedule.ngayKetThuc) {
        return schedule
    }else{
        return{
            mess:"Chưa có thời khóa biểu trong thời gian này"
        }
    }

   
  
}

module.exports={
    getschedule:getschedule
  
}