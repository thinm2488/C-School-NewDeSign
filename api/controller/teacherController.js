const mongoose = require('mongoose');
const Teacher = mongoose.model('Teacher');
const Student = mongoose.model('Student');
// const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
// const smtpTransport=require('nodemailer-smtp-transport')
// var generator=require('generate-password')
const layTeacher = async function () {
    var listTeacher = await Teacher.find().sort({ tenNguoiDung: 1 });
    return {
        listTeacher
    }

}
const layChiTietTeacher = async function (id) {
    var user = await Teacher.findOne({ _id: id });
    return {
        user
    }

}
// const islogin = async function (token) {
//     var Teacher = await Teacher.findOne(token:to);
//     return {
//         Teacher
//     }

// }
const taoTeacher = async function (data) {
    let teacher = await Teacher.findOne({ soDienThoai: data.soDienThoai });
    if (teacher) {
        return {
            message: "Số Điện Thoại đã được sử dụng!",
            status: 500
        }
    }

    teacher = new Teacher(data);
    teacher.idGV = "GV" + data.soDienThoai

    await teacher.save();
    return {
        teacher,
        message: "Thêm tài khoản thành công",
        status: 200
    }

}
const importexcel = async function (data, nguoiTao) {

    // try {
    //     for (let i=0; i <= data.length; i++) {
    //         let Teacher = await Teacher.findOne({ soDienThoai: data[i].SoDienThoai });


    //             let student = await Student.findOne({ id:  data[i].IDHocSinh })
    //             Teacher = new Teacher(data);
    //             Teacher.quanHe = student;
    //             Teacher.idTao = nguoiTao.id;
    //             Teacher.tenNguoiDung = data[i].HovaTen;
    //             Teacher.soDienThoai = data[i].SoDienThoai;
    //             Teacher.email = data[i].Email;
    //             await Teacher.save();
    //             return {

    //                 message: "Thêm tài khoản thành công",
    //                 status: 200
    //             }
    //     }


    // } catch (error) {

    // }
    data.map(async function (element) {
        let teacher = await Teacher.findOne({ soDienThoai: 0 + element.SoDienThoai });

        if (teacher) {
            return {

                message: "fail",
                status: 500
            }
        } else {

            teacher = new Teacher(data);
            teacher.idTao = nguoiTao.id;
            teacher.tenNguoiDung = element.HovaTen;
            teacher.soDienThoai = "0" + element.SoDienThoai;
            teacher.email = element.Email;
            teacher.GVCN = element.GVCN;
            teacher.idGV = "GV0" + element.SoDienThoai;
            teacher.mon = element.BoMon
            await teacher.save();
            return {

                message: "Thêm tài khoản thành công",
                status: 200
            }
        }


    })


}
const importexcelphancong = async function (data) {

    for (let a = 0; a <= data.length; a++) {
        let teacher = await Teacher.findOne({ idGV: data[a].idGV });
        if (teacher) {
            var list = [];
            var str = data[a].PhanCongChuyenMon + ",";
            var tam = ""
            for (let i = 0; i <= str.length; i++) {

                if (str[i] != ",") {
                    tam = tam + str[i]
                }
                else {
                    list.push(tam);
                    tam = ""
                }


            }
            teacher.GVCN = data[a].chuNhiem,
                teacher.lopDay = list
            await teacher.save();
        }
    }
    return {
        message: "Thành Công",
        status: 200
    }



}

const getTeacherByPhone = async function (soDienThoai) {
    let user = await Teacher.findOne({ soDienThoai: soDienThoai });
    return user;

}



const checkLogin = async function (data) {
    let teacher = await Teacher.findOne({ soDienThoai: data.soDienThoai || data });
    if (teacher) {
        if (teacher.password === data.password) {

            // saveAndroidToken(data)
            //saveAndroidToken(data.androidToken);
            return teacher


        } else {

            return {
                message: 'Sai mật khẩu hoặc password',
                status: 500
            }
        }
    } else {
        return {
            message: 'Số điện thoại không tồn tại!',
            status: 500
        }
    }

}

const editProfile = async function (data) {
    let teacher = await Teacher.findOne({ _id: data.id });


    if (data.tenNguoiDung) {
        teacher.tenNguoiDung = data.tenNguoiDung;
    }
    if (data.hinh) {
        teacher.hinh = data.hinh;
    }
    if (data.email) {
        teacher.email = data.email;
    }
    if (data.GVCN) {
        teacher.GVCN = data.GVCN;
    }
   
    if (data.lopDay) {
        let list = [];
        let str = data.lopDay + ","
        let tam = ""
        for (let i = 0; i <= str.length; i++) {

            if (str[i] != ",") {
                tam = tam + str[i]
            }
            if (str[i] == ",") {
                list.push(tam)
                tam=''
            }

        }
        teacher.lopDay = list;
    }
  
    await teacher.save();
    return { 
        status:200,
        teacher }

}
const changePass = async function (data) {
    let teacher = await Teacher.findOne({ soDienThoai: data.soDienThoai });



    if (teacher.password === data.oldpassword) {
        teacher.password = data.newpassword
    }
    else {
        throw new Error('Nhập sai mật khẩu cũ!')
    }
    await teacher.save();
    return { Teacher }

}

// function uploadImg (soDienThoai, file) {
//     return new Promise((resolve, reject) => {
//         let Teacher = await Teacher.findOne({ soDienThoai: soDienThoai }, function (err, Teacher) {
//         if (err) {
//           console.log(err)
//           return reject(responseStatus.Code500())
//         } else if (!Teacher) {
//           return reject(responseStatus.Code404())
//         } else {
//           let stream = fs.createReadStream(file.path)
//           if (file.name) {
//             if (file.size > 5242880) {
//               return reject(responseStatus.Code401())
//             } else {
//               let s3 = new AWS.S3({ signatureVersion: 'v2' })
//               const name =  './public/images/' 
//               const params = { Bucket: config.aws.bucketName, ACL: 'public-read', Key: name, Body: stream }
//               s3.upload(params, function (err, data) {
//                if (err) {
//                   console.log(err)
//                   return reject(responseStatus.Code500())
//                 } else {
//                   service.photoURL = data.Location
//                   service.save(function (err) {
//                     if (err) {
//                       return reject(responseStatus.Code500())
//                     } else {
//                       return resolve(responseStatus.Code200({ photoURL: data.Location }))
//                     }
//                   })
//                 }
//               })
//             }
//           }
//         }
//       })
//     })
//   }
// const resetPassword = async function (data,host) {
//     let Teacher = await Teacher.findOne({ Email: data.Email });
//     if (!Teacher) {
//         throw new Error('Người dùng không tồn tại!')
//     }
//     var token = jwt.sign({ Email: data.Email }, "secret")
//     var transPorter = nodemailer.createTransport(smtpTransport({
//         service: "gmail",
//         auth: {
//             Teacher: "cinemaproject19@gmail.com",
//             pass: "cinemaproject2019"
//         }
//     }))
//     var mailOption = {
//         from: "cinemaproject19@gmail.com",
//         to: data.Email,
//         subject: "Reset Password",
//         text: "Nhấp vào đường link để thay đổi mật khẩu:\n" + "http://" + host + "/Teacher/resetpassword/" + token
//     }
//     console.log(mailOption)
// return transPorter.sendMail(mailOption);
// }
const changePassword = async function (data) {
    let teacher = await Teacher.findOne({ Email: data });

    var newpass = generator.generate({
        length: 8,
        Number: true
    })
    teacher.password = newpass;


    await teacher.save();
    return { Teacher, newpass }

}
const xoaTeacher = async function (id) {
    let teacher = await Teacher.findOne({ _id: id });
    teacher.remove();
    return {
        status: 200,
        message: 'Xóa thành công!'
    }
}



module.exports = {
    layTeacher: layTeacher,
    layChiTietTeacher: layChiTietTeacher,
    //islogin:islogin,
    taoTeacher: taoTeacher,
    getTeacherByPhone: getTeacherByPhone,
    checkLogin: checkLogin,
    editProfile: editProfile,
    xoaTeacher: xoaTeacher,
    changePass: changePass,
    importexcel: importexcel,
    importexcelphancong: importexcelphancong
    // resetPassword: resetPassword,
    // changePassword:changePassword
}


