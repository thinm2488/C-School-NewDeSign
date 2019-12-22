const mongoose = require('mongoose');
const Student = mongoose.model('Student');
const Applicationform = mongoose.model('ApplicationForm');
const Android=require('./pushnotification/android')
const Class = mongoose.model('Class');
const Diligence = mongoose.model('Diligence');
const Transcript = mongoose.model('Transcript');
const Schedule = mongoose.model('Schedule');
var moment = require('moment')
// const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const createStudent = async function (data,teacher) {
    // let student = await Student.findOne({ maSoHocSinh: data.maSoHocSinh });
    // if (student) {
    //     throw new Error('Mã số đã được sử dụng ! ')
    // }
    let date = new Date(data.ngaySinh); // some mock date
    let milliseconds = date.getTime(); 
    let curentdate=new Date()
    let year=moment( curentdate).format("YYYY")
    let classs = await Class.findOne({ soHieu: data.soHieu })
    if (!classs) {

        classs = new Class(data);
        
        
        let khoi=''
        for(let i=0;i<=data.soHieu.length;i++){
            khoi=data.soHieu[0];
          break
        }
        classs.khoi = khoi;
        classs.soHieu = data.soHieu
        await classs.save()
        schedule= new Schedule();
        schedule.soHieu=data.soHieu;
        await schedule.save();
        student = new Student(data);
        student.nienKhoa=year
        await student.save();
        let transcript=new Transcript();
        transcript.GVCN=data.idTao,
        transcript.khoi=khoi
        transcript.idHocSinh=year+student._id,
        transcript.tenHocSinh=student.tenHocSinh,
        transcript.tenGV=teacher.user.tenNguoiDung,
        transcript.soHieu=student.soHieu,

        await transcript.save()
        let diligence= new Diligence();
        diligence.idHocSinh=student._id
      
        await diligence.save();
        return {
            student
        }
    } else {
      
        student = new Student(data);
        student.nienKhoa=year
        student.idTao=data.idTao
        student.ngaySinh=milliseconds
        await student.save();
        let transcript=new Transcript();
        transcript.GVCN=data.idTao,
        transcript.khoi=khoi
        transcript.idHocSinh=year+student._id,
        transcript.tenHocSinh=student.tenHocSinh,
        transcript.tenGV=teacher.user.tenNguoiDung,
        transcript.soHieu=student.soHieu
        await transcript.save()
        let diligence= new Diligence();
        diligence.idHocSinh=student.id
      
        await diligence.save();
        return {
            student
        }
    }


}
const laystudent = async function (data) {
    if (data.soHieu) {
        var liststudent = await Student.find({ soHieu: data.soHieu }).sort({tenHocSinh:1});
        return {
            liststudent
        }

    }
    if (data.khoi) {
        var liststudent = await Student.find({ khoi: data.khoi }).sort({tenHocSinh:1});
        return {
            liststudent
        }

    }


}



const layChiTietStudent = async function (id) {
    var student = await Student.findOne({ _id: id });
    return {
        student
    }

}
const editProfile = async function (data) {
    let student = await Student.findOne({ _id: data.id });


    if (data.tenHocSinh) {
        student.tenHocSinh = data.tenHocSinh;
    }
    if (data.khoi) {
        student.khoi = data.khoi;
    }
    if (data.soHieu) {
        student.soHieu = data.soHieu;
    }
    if (data.diaChi) {
        student.diaChi = data.diaChi;
    }
    if (data.ngaySinh) {
        let date = new Date(data.ngaySinh); // some mock date
        let milliseconds = date.getTime(); 
        student.ngaySinh = milliseconds;
    }
    if (data.queQuan) {
        student.queQuan = data.queQuan;
    }
    if (data.hinh) {
        student.hinh = data.hinh;
    }


    await student.save();
    return { student }

}
const nhapDiem = async function (data) {

    let student = await Student.findOne({ _id: data.id });


    if (data.tenHocSinh) {
        student.tenHocSinh = data.tenHocSinh;
    }
    if (data.diem) {
        student.lop = data.lop;
    }
    if (data.loai) {
        student.loai = data.loai;
    }
    if (data.diaChi) {
        student.diaChi = data.diaChi;
    }
    if (data.ngaySinh) {
        student.ngaySinh = data.ngaySinh;
    }
    if (data.queQuan) {
        student.queQuan = data.queQuan;
    }
    if (data.hinh) {
        student.hinh = data.hinh;
    }


    await student.save();
    return { student }

}
const xoaStudent = async function (id) {
    let student = await Student.findOne({ _id: id });
    student.remove();
    return {
        mess: 'Xóa thành công!'
    }
}
const createdayoff = async function (user, data,teacher) {
    let student = await Student.findOne({ _id: data.idHocSinh });
    applicationform = new Applicationform();
    if(data.ngayBatDau==data.ngayKetThuc){
        applicationform.soNgayNghi=1
    }
    else{
        let periodSeconds = (data.ngayKetThuc - data.ngayBatDau);
        applicationform.soNgayNghi = Math.ceil((periodSeconds/(1000*60*60*24)))+2
    }
   
    if (student) {
        applicationform.tenHocSinh = student.tenHocSinh;
        applicationform.soHieu = student.soHieu;
        applicationform.idHocSinh = student.id;
        applicationform.emailGiaoVien=teacher;
        applicationform.tenPhuHuynh = user.tenNguoiDung;
        applicationform.ngayBatDau = data.ngayBatDau;
        applicationform.ngayKetThuc = data.ngayKetThuc;
        applicationform.ngayGui = data.ngayGui*1000;
        applicationform.lyDo = data.lyDo
        
        applicationform.idPhuHuynh = user.id
        await applicationform.save();
        return {
            applicationform
        }
    } else {
        throw new Error("Không có học sinh trong danh sách")
    }
}
const getdayoff = async function (id) {
    //let student= await Student.findOne({_id:data.idHocSinh});
    let dayoff = await Applicationform.find({ idHocSinh: id }).sort({ngayGui:-1})

    if (dayoff) {
        return {
            dayoff
        }
    } else {
        throw new Error("Không có dữ liệu")
    }

}
const getalldayoff = async function () {
    //let student= await Student.findOne({_id:data.idHocSinh});
    let dayoff = await Applicationform.find().sort({ngayGui:-1})

    if (dayoff) {
        return {
            dayoff
        }
    } else {
        throw new Error("Không có dữ liệu")
    }

}
const alloweddayoff = async function (data) {
    //let student= await Student.findOne({_id:data.idHocSinh});
    let dayoff = await Applicationform.findOne({_id:data.id})
   
    if (dayoff) {
        dayoff.trangThai=true
        await dayoff.save()
        let deligence = await Diligence.findOne({idHocSinh:dayoff.idHocSinh})
        if(deligence){
            // var dateTime = dayoff.ngayBatDau;
            // var ngayNghi = moment( dateTime).format("MM");
            if(deligence.soLuong){
                deligence.soLuong=deligence.soLuong+Number(dayoff.soNgayNghi)

            }else{
                deligence.soLuong=Number(dayoff.soNgayNghi)
            }
            deligence.danhSachNgayNghi.push(dayoff);
            await deligence.save()
           
            
        }

        return {
            dayoff
        }
    } else {
        throw new Error("Không có dữ liệu")
    }

}
const denydayoff = async function (data) {
    //let student= await Student.findOne({_id:data.idHocSinh});
    let dayoff = await Applicationform.findOne({_id:data.id})
   
    if (dayoff) {
      
           return {dayoff:dayoff};
     
    } else {
        throw new Error("Không có dữ liệu")
    }

}
const getdayoffbyid = async function (id) {
    //let student= await Student.findOne({_id:data.idHocSinh});
    let dayoff = await Applicationform.findOne({_id:id})
   
    if (dayoff) {
        return {
            dayoff
        }
    } else {
        throw new Error("Không có dữ liệu")
    }

}
const importexcel = async function (data,teacher) {
    let classs = await Class.findOne({ soHieu: data.soHieu })
    if (!classs) {
        classs = new Class();
        let khoi=''
        for(let i=0;i<=data.soHieu.length;i++){
            khoi=data.soHieu[0];
            
        }
        classs.khoi = khoi;
        classs.soHieu = data.soHieu
        await classs.save()
    }
    for(let i=0;i< data.liststudent.length;i++){
        let date = new Date( data.liststudent[i].ngaySinh); // some mock date
        let milliseconds = date.getTime(); 
        student = new Student(data);
        student.tenHocSinh =  data.liststudent[i].tenHocSinh;
        student.soHieu =  data.liststudent[i].soHieu;
        // student.khoi =  data.liststudent[i].khoi;
        student.ngaySinh = milliseconds;
        student.gioiTinh =  data.liststudent[i].gioiTinh;
        student.diaChi =  data.liststudent[i].diaChi;
        await student.save();
        if(student){
            let transcript=new Transcript();
            transcript.GVCN=data.idTao,
            transcript.khoi=data.khoi
            transcript.idHocSinh=student._id,
            transcript.tenHocSinh=student.tenHocSinh,
            transcript.tenGV=teacher.user.tenNguoiDung,
            transcript.soHieu=student.soHieu
            await transcript.save();
            let diligence= new Diligence();
            diligence.idHocSinh=student._id
      
            await diligence.save();
        }
      
      
        
    }
    

            
            return {

                message: "Thêm tài khoản thành công",
                status: 200
            }
        


}
const getclass = async function (data) {
    //let student= await Student.findOne({_id:data.idHocSinh});
    let Classes = await Class.find({ khoi: data.khoi }).sort({soHieu:1})

  
        return {
            Classes
        }
    
}
module.exports = {
    createStudent: createStudent,
    laystudent: laystudent,
    layChiTietStudent: layChiTietStudent,
    editProfile: editProfile,
    xoaStudent: xoaStudent,
    nhapDiem: nhapDiem,
    createdayoff: createdayoff,
    getdayoff: getdayoff,
    alloweddayoff:alloweddayoff,
    getalldayoff:getalldayoff,
    importexcel: importexcel,
    getclass:getclass,
    getdayoffbyid:getdayoffbyid,
    denydayoff:denydayoff
}