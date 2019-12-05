var nodemailer = require('nodemailer');
var moment = require('moment')

const sendMail = async function (data) {
    //let student= await Student.findOne({_id:data.idHocSinh});
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'cschool.education@gmail.com',
          pass: 'huynhnhu'
        }
      });
      if(data.ngayBatDau==data.ngayKetThuc){
        var dateTime = data.ngayBatDau+1000;
        var ngayNghi =moment( dateTime).format("DD/MM/YY");
      }else{
        var ngayBatDau = data.ngayBatDau+1000;
        var ngayKetThuc = data.ngayKetThuc+1000;
        var ngayNghi =(moment( ngayBatDau).format("DD/MM/YY"))+" - "+(moment( ngayKetThuc).format("DD/MM/YY"));
      }
       

      var mailOptions = {
        from: 'cschool.education@gmail.com',
        to: ''+data.emailGiaoVien+'',
        subject: 'Xin Phép Nghỉ Học',
        text: '',
        html: '<p>Xin chào thầy/Cô</p><p>Tôi tên là '+data.tenPhuHuynh+' phụ huynh của em '+data.tenHocSinh+' .</p><p>Vì lý do: '+data.lyDo+'</p><p> tôi xin phép cho em '+data.tenHocSinh+' được nghỉ học vào ngày '+ngayNghi+' .</p><br/><p>Cảm ơn thầy/cô!</p>'

      };
      
      transporter.sendMail(mailOptions, function(error, info){
        console.log(mailOptions)
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}
 module.exports={
     sendMail:sendMail
 }