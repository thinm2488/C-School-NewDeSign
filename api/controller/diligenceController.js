const mongoose = require('mongoose');
const Diligence = mongoose.model('Diligence');
// const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const getall = async function (id) {
   
    
    
    let diligence = await Diligence.findOne({ idHocSinh:id });
  
   
  return {
      diligence,
      status:200
  }

   
  
}

module.exports={
    getall:getall
    
  
}