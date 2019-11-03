const mongoose = require('mongoose');
const Transcript = mongoose.model('Transcript');
const moment =require('moment')
// const Transcript = mongoose.model('Teacher');
// const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const gettranscript = async function (id) {

    let transcript = await Transcript.findOne({ idHocSinh: id }).sort({ tenHocSinh: 1 });
    return {
        transcript,
        status: 200
    }



}
const getalltranscript = async function (sohieu) {

    let transcript = await Transcript.find({ soHieu: sohieu }).sort({ tenHocSinh: 1 });
    return {
        transcript,
        status: 200
    }



}
const getalltranscriptbysub = async function (data) {
    let transcript = [

    ]

    let list = await Transcript.find({ soHieu: data.soHieu }).sort({ tenHocSinh: 1 });
    if (data.mon == "Anh") {

        list.forEach(element => {
            let obj = {
                GVCN: element.GVCN,
                idHocSinh: element.idHocSinh,
                tenHocSinh: element.tenHocSinh,
                tenGV: element.tenGV,
                soHieu: element.soHieu,
                HKI: element.HKI.diemAnh,
                HKII: element.HKII.diemAnh,
                TBCN: element.TBMCN,
                xepLoai:element.xepLoai
            }

            transcript.push(obj)

        });
    }
    if (data.mon == "Toán") {
        list.forEach(element => {
            let obj = {
                GVCN: element.GVCN,
                idHocSinh: element.idHocSinh,
                tenHocSinh: element.tenHocSinh,
                tenGV: element.tenGV,
                soHieu: element.soHieu,
                HKI: element.HKI.diemToan,
                HKII: element.HKII.diemToan,
                TBCN: element.TBMCN,
                xepLoai:element.xepLoai
            }

            transcript.push(obj)
        });
    }
    if (data.mon == "Văn") {
        list.forEach(element => {
            let obj = {
                GVCN: element.GVCN,
                idHocSinh: element.idHocSinh,
                tenHocSinh: element.tenHocSinh,
                tenGV: element.tenGV,
                soHieu: element.soHieu,
                HKI: element.HKI.diemVan,
                HKII: element.HKII.diemVan,
                TBCN: element.TBMCN,
                xepLoai:element.xepLoai,
            }

            transcript.push(obj)
        });
    }
    if (data.mon == "Sinh") {
        list.forEach(element => {
            let obj = {
                GVCN: element.GVCN,
                idHocSinh: element.idHocSinh,
                tenHocSinh: element.tenHocSinh,
                tenGV: element.tenGV,
                soHieu: element.soHieu,
                HKI: element.HKI.diemSinh,
                HKII: element.HKII.diemSinh,
                TBCN: element.TBMCN,
                xepLoai:element.xepLoai
            }

            transcript.push(obj)
        });
    }
    if (data.mon == "Sử") {
        list.forEach(element => {
            let obj = {
                GVCN: element.GVCN,
                idHocSinh: element.idHocSinh,
                tenHocSinh: element.tenHocSinh,
                tenGV: element.tenGV,
                soHieu: element.soHieu,
                HKI: element.HKI.diemSu,
                HKII: element.HKII.diemSu,
                TBCN: element.TBMCN,
                xepLoai:element.xepLoai
            }

            transcript.push(obj)
        });
    }
    if (data.mon == "Địa") {
        list.forEach(element => {
            let obj = {
                GVCN: element.GVCN,
                idHocSinh: element.idHocSinh,
                tenHocSinh: element.tenHocSinh,
                tenGV: element.tenGV,
                soHieu: element.soHieu,
                HKI: element.HKI.diemDia,
                HKII: element.HKII.diemDia,
                TBCN: element.TBMCN,
                xepLoai:element.xepLoai
            }

            transcript.push(obj)
        });
    }
    if (data.mon == "Lý") {
        list.forEach(element => {
            let obj = {
                GVCN: element.GVCN,
                idHocSinh: element.idHocSinh,
                tenHocSinh: element.tenHocSinh,
                tenGV: element.tenGV,
                soHieu: element.soHieu,
                HKI: element.HKI.diemLy,
                HKII: element.HKII.diemLy,
                TBCN: element.TBMCN,
                xepLoai:element.xepLoai
            }

            transcript.push(obj)
        });
    }
    if (data.mon == "Hóa") {
        list.forEach(element => {
            let obj = {
                GVCN: element.GVCN,
                idHocSinh: element.idHocSinh,
                tenHocSinh: element.tenHocSinh,
                tenGV: element.tenGV,
                soHieu: element.soHieu,
                HKI: element.HKI.diemHoa,
                HKII: element.HKII.diemHoa,
                TBCN: element.TBMCN,
                xepLoai:element.xepLoai
            }

            transcript.push(obj)
        });
    }
    if (data.mon == "GDCD") {
        list.forEach(element => {
            let obj = {
                GVCN: element.GVCN,
                idHocSinh: element.idHocSinh,
                tenHocSinh: element.tenHocSinh,
                tenGV: element.tenGV,
                soHieu: element.soHieu,
                HKI: element.HKI.diemGDCD,
                HKII: element.HKII.diemGDCD,
                TBCN: element.TBMCN,
                xepLoai:element.xepLoai
            }

            transcript.push(obj)
        });
    }
    if (data.mon == "Công Nghệ") {
        list.forEach(element => {
            let obj = {
                GVCN: element.GVCN,
                idHocSinh: element.idHocSinh,
                tenHocSinh: element.tenHocSinh,
                tenGV: element.tenGV,
                soHieu: element.soHieu,
                HKI: element.HKI.diemCongNghe,
                HKII: element.HKII.diemCongNghe,
                TBCN: element.TBMCN,
                xepLoai:element.xepLoai
            }

            transcript.push(obj)
        });
    }
    if (data.mon == "Thể Dục") {
        list.forEach(element => {
            let obj = {
                GVCN: element.GVCN,
                idHocSinh: element.idHocSinh,
                tenHocSinh: element.tenHocSinh,
                tenGV: element.tenGV,
                soHieu: element.soHieu,
                HKI: element.HKI.diemTheDuc,
                HKII: element.HKII.diemTheDuc,
                TBCN: element.TBMCN,
                xepLoai:element.xepLoai
            }

            transcript.push(obj)
        });
    }
    if (data.mon == "Tin") {
        list.forEach(element => {
            let obj = {
                GVCN: element.GVCN,
                idHocSinh: element.idHocSinh,
                tenHocSinh: element.tenHocSinh,
                tenGV: element.tenGV,
                soHieu: element.soHieu,
                HKI: element.HKI.diemTin,
                HKII: element.HKII.diemTin,
                TBCN: element.TBMCN,
                xepLoai:element.xepLoai
            }

            transcript.push(obj)
        });
    }
    if (data.mon == "Mỹ Thuật") {
        list.forEach(element => {
            let obj = {
                GVCN: element.GVCN,
                idHocSinh: element.idHocSinh,
                tenHocSinh: element.tenHocSinh,
                tenGV: element.tenGV,
                soHieu: element.soHieu,
                HKI: element.HKI.diemMyThuat,
                HKII: element.HKII.diemMyThuat,
                TBCN: element.TBMCN,
                xepLoai:element.xepLoai
            }

            transcript.push(obj)
        });
    }

    return {
        transcript,
        status: 200
    }



}

const gettranscriptsub = async function (data) {

    let ts = await Transcript.findOne({ idHocSinh: data.id });
    if (data.mon == "Anh") {
        let transcript = {
            HKI: ts.HKI.diemAnh,
            HKII: ts.HKII.diemAnh,
            GVCN: ts.GVCN,
            tenGV: ts.tenGV,
            soHieu: ts.soHieu,
            idHocSinh: ts.idHocSinh,
            tenHocSinh: ts.tenHocSinh,

        }
        return {
            transcript,
            status: 200
        }
    }
    if (data.mon == "Văn") {
        let transcript = {
            HKI: ts.HKI.diemVan,
            HKII: ts.HKII.diemVan,
            GVCN: ts.GVCN,
            tenGV: ts.tenGV,
            soHieu: ts.soHieu,
            idHocSinh: ts.idHocSinh,
            tenHocSinh: ts.tenHocSinh,

        }
        return {
            transcript,
            status: 200
        }
    }
    if (data.mon == "Toán") {
        let transcript = {
            HKI: ts.HKI.diemToan,
            HKII: ts.HKII.diemToan,
            GVCN: ts.GVCN,
            tenGV: ts.tenGV,
            soHieu: ts.soHieu,
            idHocSinh: ts.idHocSinh,
            tenHocSinh: ts.tenHocSinh,

        }
        return {
            transcript,
            status: 200
        }
    }
    if (data.mon == "Lý") {
        let transcript = {
            HKI: ts.HKI.diemLy,
            HKII: ts.HKII.diemLy,
            GVCN: ts.GVCN,
            tenGV: ts.tenGV,
            soHieu: ts.soHieu,
            idHocSinh: ts.idHocSinh,
            tenHocSinh: ts.tenHocSinh,

        }
        return {
            transcript,
            status: 200
        }
    }
    if (data.mon == "Hóa") {
        let transcript = {
            HKI: ts.HKI.diemHoa,
            HKII: ts.HKII.diemHoa,
            GVCN: ts.GVCN,
            tenGV: ts.tenGV,
            soHieu: ts.soHieu,
            idHocSinh: ts.idHocSinh,
            tenHocSinh: ts.tenHocSinh,

        }
        return {
            transcript,
            status: 200
        }
    }
    if (data.mon == "Sinh") {
        let transcript = {
            HKI: ts.HKI.diemSinh,
            HKII: ts.HKII.diemSinh,
            GVCN: ts.GVCN,
            tenGV: ts.tenGV,
            soHieu: ts.soHieu,
            idHocSinh: ts.idHocSinh,
            tenHocSinh: ts.tenHocSinh,

        }
        return {
            transcript,
            status: 200
        }
    }
    if (data.mon == "Sử") {
        let transcript = {
            HKI: ts.HKI.diemSu,
            HKII: ts.HKII.diemSu,
            GVCN: ts.GVCN,
            tenGV: ts.tenGV,
            soHieu: ts.soHieu,
            idHocSinh: ts.idHocSinh,
            tenHocSinh: ts.tenHocSinh,

        }
        return {
            transcript,
            status: 200
        }
    }
    if (data.mon == "Địa") {
        let transcript = {
            HKI: ts.HKI.diemDia,
            HKII: ts.HKII.diemDia,
            GVCN: ts.GVCN,
            tenGV: ts.tenGV,
            soHieu: ts.soHieu,
            idHocSinh: ts.idHocSinh,
            tenHocSinh: ts.tenHocSinh,

        }
        return {
            transcript,
            status: 200
        }
    }
    if (data.mon == "Công Nghệ") {
        let transcript = {
            HKI: ts.HKI.diemCongNghe,
            HKII: ts.HKII.diemCongNghe,
            GVCN: ts.GVCN,
            tenGV: ts.tenGV,
            soHieu: ts.soHieu,
            idHocSinh: ts.idHocSinh,
            tenHocSinh: ts.tenHocSinh,

        }
        return {
            transcript,
            status: 200
        }
    }
    if (data.mon == "Tin") {
        let transcript = {
            HKI: ts.HKI.diemTin,
            HKII: ts.HKII.diemTin,
            GVCN: ts.GVCN,
            tenGV: ts.tenGV,
            soHieu: ts.soHieu,
            idHocSinh: ts.idHocSinh,
            tenHocSinh: ts.tenHocSinh,

        }
        return {
            transcript,
            status: 200
        }
    }
    if (data.mon == "Thể Dục") {
        let transcript = {
            HKI: ts.HKI.diemTheDuc,
            HKII: ts.HKII.diemTheDuc,
            GVCN: ts.GVCN,
            tenGV: ts.tenGV,
            soHieu: ts.soHieu,
            idHocSinh: ts.idHocSinh,
            tenHocSinh: ts.tenHocSinh,

        }
        return {
            transcript,
            status: 200
        }
    }
    if (data.mon == "Mỹ Thuật") {
        let transcript = {
            HKI: ts.HKI.diemMyThuat,
            HKII: ts.HKII.diemMyThuat,
            GVCN: ts.GVCN,
            tenGV: ts.tenGV,
            soHieu: ts.soHieu,
            idHocSinh: ts.idHocSinh,
            tenHocSinh: ts.tenHocSinh,

        }
        return {
            transcript,
            status: 200
        }
    }
    if (data.mon == "GDCD") {
        let transcript = {
            HKI: ts.HKI.diemGDCD,
            HKII: ts.HKII.diemGDCD,
            GVCN: ts.GVCN,
            tenGV: ts.tenGV,
            soHieu: ts.soHieu,
            idHocSinh: ts.idHocSinh,
            tenHocSinh: ts.tenHocSinh,

        }
        return {
            transcript,
            status: 200
        }
    }






}


caculateTBM = function (diemM, diem15p, diem1tiet, diemGK, diemCK) {
    let sumM = 0
    let sum15p = 0
    let sum1tiet = 0
    diemM.forEach(element => {
        sumM = sumM + Number(element.diem)
    });
    diem15p.forEach(element => {
        sum15p = sum15p + Number(element.diem)
    });
    diem1tiet.forEach(element => {
        sum1tiet = sum1tiet + Number(element.diem)
    });
    if (diemCK == '' || diemGK == '') {
        TBM = ''
        return TBM
    }
    else {
        var TBM = (((sumM / diemM.length) + (sum15p / diem15p.length) + (sum1tiet / diem1tiet.length * 2) + (diemGK * 2) + (diemCK * 3)) / 9)
        if (!TBM) {
            TBM = ''
            return TBM
        } else {
            return TBM.toFixed(1)
        }
    }


    // return TBM

    // if(sumM==0){
    //     var TBM =(( (sum15p / diem15p.length) + (sum1tiet / diem1tiet.length * 2) + (diemGK * 2) + (diemCK * 3)) / 9)
    //     return TBM
    // }
    // else if(sum15p==0){
    //     var TBM =(( (sumM / diemM.length)  + (sum1tiet / diem1tiet.length * 2) + (diemGK * 2) + (diemCK * 3)) / 9)
    //     return TBM
    // }
    // else if(sum1tiet==0){
    //     var TBM =(((sumM / diemM.length) + (sum15p / diem15p.length) + (diemGK * 2) + (diemCK * 3)) / 9)
    //     return TBM
    // }
    // else{
    //     var TBM =(((sumM / diemM.length) + (sum15p / diem15p.length) + + (sum1tiet / diem1tiet.length * 2) + (diemGK * 2) + (diemCK * 3)) / 9)
    //     return TBM
    // }





}

const inserttranscript = async function (data) {
    let transcript = await Transcript.findOne({ idHocSinh: data.idHocSinh })
    if (transcript) {


        let list = [
         
        ]
        if (data.bangDiem.diemmieng1 && data.bangDiem.diemmieng1 != '') {
            list.push({diem:data.bangDiem.diemmieng1})
        }
        if (data.bangDiem.diemmieng2 && data.bangDiem.diemmieng2 != '') {
            list.push({diem:data.bangDiem.diemmieng2})
        }
        if (data.bangDiem.diemmieng3 && data.bangDiem.diemmieng3 != '') {
            list.push({diem:data.bangDiem.diemmieng3})
        }
        let list1 = []
        if (data.bangDiem.diem15p1 && data.bangDiem.diem15p1 != '') {
            list1.push({diem:data.bangDiem.diem15p1})
        }
        if (data.bangDiem.diem15p2 && data.bangDiem.diem15p2 != '') {
            list1.push({diem:data.bangDiem.diem15p2})
        }
        if (data.bangDiem.diem15p3 && data.bangDiem.dien15p3 != '') {
            list1.push({diem:data.bangDiem.diem15p3})
        }
        let list2 = []
        if (data.bangDiem.diem1tiet1 && data.bangDiem.diem1tiet1 != '') {
            list2.push({diem:data.bangDiem.diem1tiet1})
        }
        if (data.bangDiem.diem1tiet2 && data.bangDiem.diem1tiet2 != '') {
            list2.push({diem:data.bangDiem.diem1tiet2})
        }
        if (data.bangDiem.diem1tiet3 && data.bangDiem.diem1tiet3 != '') {
            list2.push({diem:data.bangDiem.diem1tiet3})
        }


        let list3 = []
        if (data.bangDiem.diemmieng4 && data.bangDiem.diemmieng4 != '') {
            list3.push({diem:data.bangDiem.diemmieng4})
        }
        if (data.bangDiem.diemmieng5 && data.bangDiem.diemmieng5 != '') {
            list3.push({diem:data.bangDiem.diemmieng5})
        }
        if (data.bangDiem.diemmieng6 && data.bangDiem.diemmieng6 != '') {
            list3.push({diem:data.bangDiem.diemmieng6})
        }
        let list4 = [ ]
        if (data.bangDiem.diem15p4 && data.bangDiem.diem15p4 != '') {
            list4.push({diem:data.bangDiem.diem15p4})
        }
        if (data.bangDiem.diem15p5 && data.bangDiem.diem15p5 != '') {
            list4.push({diem:data.bangDiem.diem15p5})
        }
        if (data.bangDiem.diem15p6 && data.bangDiem.dien15p6 != '') {
            list4.push({diem:data.bangDiem.diem15p6})
        }
        let list5 = []
        if (data.bangDiem.diem1tiet4 && data.bangDiem.diem1tiet4 != '') {
            list5.push({diem:data.bangDiem.diem1tiet4})
        }
        if (data.bangDiem.diem1tiet5 && data.bangDiem.diem1tiet5 != '') {
            list5.push({diem:data.bangDiem.diem1tiet5})
        }
        if (data.bangDiem.diem1tiet6 && data.bangDiem.diem1tiet6 != '') {
            list5.push({diem:data.bangDiem.diem1tiet6})
        }
        // let sumM=sum/list.length
        // let sum15p=
        if (data.mon == "Anh") {
            transcript.HKI.diemAnh.diemMieng = list
            transcript.HKI.diemAnh.diem15p = list1
            transcript.HKI.diemAnh.diem1tiet = list2
            transcript.HKI.diemAnh.diemGiuaKy = data.bangDiem.GKI
            transcript.HKII.diemAnh.diemGiuaKy = data.bangDiem.GKII
            transcript.HKII.diemAnh.diemMieng = list3
            transcript.HKII.diemAnh.diem15p = list4
            transcript.HKII.diemAnh.diem1tiet = list5
            transcript.HKI.diemAnh.diemCuoiKy = data.bangDiem.CKI
            transcript.HKII.diemAnh.diemCuoiKy = data.bangDiem.CKII
            transcript.HKII.diemAnh.diemTB = data.bangDiem.canam
            transcript.idHocSinh = data.idHocSinh
            // transcript.diemAnh.HKI.diemTB = 
            transcript.soHieu = data.soHieu
            let TBMHKI = 0
            let TBMHKII = 0

            TBMHKI = caculateTBM(transcript.HKI.diemAnh.diemMieng, transcript.HKI.diemAnh.diem15p, transcript.HKI.diemAnh.diem1tiet, transcript.HKI.diemAnh.diemGiuaKy, transcript.HKI.diemAnh.diemCuoiKy)
            TBMHKII = caculateTBM(transcript.HKII.diemAnh.diemMieng, transcript.HKII.diemAnh.diem15p, transcript.HKII.diemAnh.diem1tiet, transcript.HKII.diemAnh.diemGiuaKy, transcript.HKII.diemAnh.diemCuoiKy)


            transcript.HKI.diemAnh.diemTB = TBMHKI
            transcript.HKII.diemAnh.diemTB = TBMHKII
            if (TBMHKI == "" || TBMHKII == "") {
                transcript.HKII.diemAnh.TBCN = ''
            } else {

                transcript.HKII.diemAnh.TBCN = ((Number(TBMHKI) + (Number(TBMHKII * 2))) / 3).toFixed(1)
            }


            await transcript.save()
        } if (data.mon == "Toán") {
            transcript.HKI.diemToan.diemMieng = list
            transcript.HKI.diemToan.diem15p = list1
            transcript.HKI.diemToan.diem1tiet = list2
            transcript.HKI.diemToan.diemGiuaKy = data.bangDiem.GKI
            transcript.HKII.diemToan.diemGiuaKy = data.bangDiem.GKII
            transcript.HKII.diemToan.diemMieng = list3
            transcript.HKII.diemToan.diem15p = list4
            transcript.HKII.diemToan.diem1tiet = list5
            transcript.HKI.diemToan.diemCuoiKy = data.bangDiem.CKI
            transcript.HKII.diemToan.diemCuoiKy = data.bangDiem.CKII
            transcript.HKII.diemToan.diemTB = data.bangDiem.canam
            transcript.idHocSinh = data.idHocSinh
            // transcript.diemAnh.HKI.diemTB = 
            transcript.soHieu = data.soHieu
            let TBMHKI = 0
            let TBMHKII = 0

            TBMHKI = caculateTBM(transcript.HKI.diemToan.diemMieng, transcript.HKI.diemToan.diem15p, transcript.HKI.diemToan.diem1tiet, transcript.HKI.diemToan.diemGiuaKy, transcript.HKI.diemToan.diemCuoiKy)
            TBMHKII = caculateTBM(transcript.HKII.diemToan.diemMieng, transcript.HKII.diemToan.diem15p, transcript.HKII.diemToan.diem1tiet, transcript.HKII.diemToan.diemGiuaKy, transcript.HKII.diemToan.diemCuoiKy)


            transcript.HKI.diemToan.diemTB = TBMHKI
            transcript.HKII.diemToan.diemTB = TBMHKII
            if (TBMHKI == "" || TBMHKII == "") {
                transcript.HKII.diemToan.TBCN = ''
            } else {
                transcript.HKII.diemToan.TBCN = ((Number(TBMHKI) + (Number(TBMHKII) * 2)) / 3).toFixed(1)
            }


            await transcript.save()
        } if (data.mon == "Văn") {
            transcript.HKI.diemVan.diemMieng = list
            transcript.HKI.diemVan.diem15p = list1
            transcript.HKI.diemVan.diem1tiet = list2
            transcript.HKI.diemVan.diemGiuaKy = data.bangDiem.GKI
            transcript.HKII.diemVan.diemGiuaKy = data.bangDiem.GKII
            transcript.HKII.diemVan.diemMieng = list3
            transcript.HKII.diemVan.diem15p = list4
            transcript.HKII.diemVan.diem1tiet = list5
            transcript.HKI.diemVan.diemCuoiKy = data.bangDiem.CKI
            transcript.HKII.diemVan.diemCuoiKy = data.bangDiem.CKII
            transcript.HKII.diemVan.diemTB = data.bangDiem.canam
            transcript.idHocSinh = data.idHocSinh
            // transcript.diemAnh.HKI.diemTB = 
            transcript.soHieu = data.soHieu

            let TBMHKI = 0
            let TBMHKII = 0

            TBMHKI = caculateTBM(transcript.HKI.diemVan.diemMieng, transcript.HKI.diemVan.diem15p, transcript.HKI.diemVan.diem1tiet, transcript.HKI.diemVan.diemGiuaKy, transcript.HKI.diemVan.diemCuoiKy)
            TBMHKII = caculateTBM(transcript.HKII.diemVan.diemMieng, transcript.HKII.diemVan.diem15p, transcript.HKII.diemVan.diem1tiet, transcript.HKII.diemVan.diemGiuaKy, transcript.HKII.diemVan.diemCuoiKy)


            transcript.HKI.diemVan.diemTB = TBMHKI
            transcript.HKII.diemVan.diemTB = TBMHKII
            if (TBMHKI == "" || TBMHKII == "") {
                transcript.HKII.diemVan.TBCN = ''
            }
            else {
                transcript.HKII.diemVan.TBCN = ((Number(TBMHKI) + (Number(TBMHKII) * 2)) / 3).toFixed(1)
            }

            await transcript.save()
        }
        if (data.mon == "Sinh") {
            transcript.HKI.diemSinh.diemMieng = list
            transcript.HKI.diemSinh.diem15p = list1
            transcript.HKI.diemSinh.diem1tiet = list2
            transcript.HKI.diemSinh.diemGiuaKy = data.bangDiem.GKI
            transcript.HKII.diemSinh.diemGiuaKy = data.bangDiem.GKII
            transcript.HKII.diemSinh.diemMieng = list3
            transcript.HKII.diemSinh.diem15p = list4
            transcript.HKII.diemSinh.diem1tiet = list5
            transcript.HKI.diemSinh.diemCuoiKy = data.bangDiem.CKI
            transcript.HKII.diemSinh.diemCuoiKy = data.bangDiem.CKII
            transcript.HKII.diemSinh.diemTB = data.bangDiem.canam
            transcript.idHocSinh = data.idHocSinh
            // transcript.diemAnh.HKI.diemTB = 
            transcript.soHieu = data.soHieu
            let TBMHKI = 0
            let TBMHKII = 0

            TBMHKI = caculateTBM(transcript.HKI.diemSinh.diemMieng, transcript.HKI.diemSinh.diem15p, transcript.HKI.diemSinh.diem1tiet, transcript.HKI.diemSinh.diemGiuaKy, transcript.HKI.diemSinh.diemCuoiKy)
            TBMHKII = caculateTBM(transcript.HKII.diemSinh.diemMieng, transcript.HKII.diemSinh.diem15p, transcript.HKII.diemSinh.diem1tiet, transcript.HKII.diemSinh.diemGiuaKy, transcript.HKII.diemSinh.diemCuoiKy)


            transcript.HKI.diemSinh.diemTB = TBMHKI
            transcript.HKII.diemSinh.diemTB = TBMHKII
            if (TBMHKI == "" || TBMHKII == "") {
                transcript.HKII.diemSinh.TBCN = ''
            } else {
                transcript.HKII.diemSinh.TBCN = ((Number(TBMHKI) + (Number(TBMHKII) * 2)) / 3).toFixed(1)
            }

            await transcript.save()
        }
        if (data.mon == "Sử") {
            transcript.HKI.diemSu.diemMieng = list
            transcript.HKI.diemSu.diem15p = list1
            transcript.HKI.diemSu.diem1tiet = list2
            transcript.HKI.diemSu.diemGiuaKy = data.bangDiem.GKI
            transcript.HKII.diemSu.diemGiuaKy = data.bangDiem.GKII
            transcript.HKII.diemSu.diemMieng = list3
            transcript.HKII.diemSu.diem15p = list4
            transcript.HKII.diemSu.diem1tiet = list5
            transcript.HKI.diemSu.diemCuoiKy = data.bangDiem.CKI
            transcript.HKII.diemSu.diemCuoiKy = data.bangDiem.CKII
            transcript.HKII.diemSu.diemTB = data.bangDiem.canam
            transcript.idHocSinh = data.idHocSinh
            // transcript.diemAnh.HKI.diemTB = 
            transcript.soHieu = data.soHieu
            let TBMHKI = 0
            let TBMHKII = 0

            TBMHKI = caculateTBM(transcript.HKI.diemSu.diemMieng, transcript.HKI.diemSu.diem15p, transcript.HKI.diemSu.diem1tiet, transcript.HKI.diemSu.diemGiuaKy, transcript.HKI.diemSu.diemCuoiKy)
            TBMHKII = caculateTBM(transcript.HKII.diemSu.diemMieng, transcript.HKII.diemSu.diem15p, transcript.HKII.diemSu.diem1tiet, transcript.HKII.diemSu.diemGiuaKy, transcript.HKII.diemSu.diemCuoiKy)


            transcript.HKI.diemSu.diemTB = TBMHKI
            transcript.HKII.diemSu.diemTB = TBMHKII
            if (TBMHKI == "" || TBMHKII == "") {
                transcript.HKII.diemSu.TBCN = ''
            } else {
                transcript.HKII.diemSu.TBCN = ((Number(TBMHKI) + (Number(TBMHKII) * 2)) / 3).toFixed(1)
            }

            await transcript.save()
        }
        if (data.mon == "Địa") {
            transcript.HKI.diemDia.diemMieng = list
            transcript.HKI.diemDia.diem15p = list1
            transcript.HKI.diemDia.diem1tiet = list2
            transcript.HKI.diemDia.diemGiuaKy = data.bangDiem.GKI
            transcript.HKII.diemDia.diemGiuaKy = data.bangDiem.GKII
            transcript.HKII.diemDia.diemMieng = list3
            transcript.HKII.diemDia.diem15p = list4
            transcript.HKII.diemDia.diem1tiet = list5
            transcript.HKI.diemDia.diemCuoiKy = data.bangDiem.CKI
            transcript.HKII.diemDia.diemCuoiKy = data.bangDiem.CKII
            transcript.HKII.diemDia.diemTB = data.bangDiem.canam
            transcript.idHocSinh = data.idHocSinh
            // transcript.diemAnh.HKI.diemTB = 
            transcript.soHieu = data.soHieu
            let TBMHKI = 0
            let TBMHKII = 0

            TBMHKI = caculateTBM(transcript.HKI.diemDia.diemMieng, transcript.HKI.diemDia.diem15p, transcript.HKI.diemDia.diem1tiet, transcript.HKI.diemDia.diemGiuaKy, transcript.HKI.diemDia.diemCuoiKy)
            TBMHKII = caculateTBM(transcript.HKII.diemDia.diemMieng, transcript.HKII.diemDia.diem15p, transcript.HKII.diemDia.diem1tiet, transcript.HKII.diemDia.diemGiuaKy, transcript.HKII.diemDia.diemCuoiKy)


            transcript.HKI.diemDia.diemTB = TBMHKI
            transcript.HKII.diemDia.diemTB = TBMHKII
            if (TBMHKI == "" || TBMHKII == "") {
                transcript.HKII.diemDia.TBCN = ''
            } else {
                transcript.HKII.diemDia.TBCN = ((Number(TBMHKI) + (Number(TBMHKII) * 2)) / 3).toFixed(1)
            }

            await transcript.save()
        }
        if (data.mon == "Lý") {
            transcript.HKI.diemLy.diemMieng = list
            transcript.HKI.diemLy.diem15p = list1
            transcript.HKI.diemLy.diem1tiet = list2
            transcript.HKI.diemLy.diemGiuaKy = data.bangDiem.GKI
            transcript.HKII.diemLy.diemGiuaKy = data.bangDiem.GKII
            transcript.HKII.diemLy.diemMieng = list3
            transcript.HKII.diemLy.diem15p = list4
            transcript.HKII.diemLy.diem1tiet = list5
            transcript.HKI.diemLy.diemCuoiKy = data.bangDiem.CKI
            transcript.HKII.diemLy.diemCuoiKy = data.bangDiem.CKII
            transcript.HKII.diemLy.diemTB = data.bangDiem.canam
            transcript.idHocSinh = data.idHocSinh
            // transcript.diemAnh.HKI.diemTB = 
            transcript.soHieu = data.soHieu
            let TBMHKI = 0
            let TBMHKII = 0

            TBMHKI = caculateTBM(transcript.HKI.diemLy.diemMieng, transcript.HKI.diemLy.diem15p, transcript.HKI.diemLy.diem1tiet, transcript.HKI.diemLy.diemGiuaKy, transcript.HKI.diemLy.diemCuoiKy)
            TBMHKII = caculateTBM(transcript.HKII.diemLy.diemMieng, transcript.HKII.diemLy.diem15p, transcript.HKII.diemLy.diem1tiet, transcript.HKII.diemLy.diemGiuaKy, transcript.HKII.diemLy.diemCuoiKy)


            transcript.HKI.diemLy.diemTB = TBMHKI
            transcript.HKII.diemLy.diemTB = TBMHKII
            if (TBMHKI == "" || TBMHKII == "") {
                transcript.HKII.diemLy.TBCN = ''
            } else {
                transcript.HKII.diemLy.TBCN = ((Number(TBMHKI) + (Number(TBMHKII) * 2)) / 3).toFixed(1)
            }

            await transcript.save()
        }
        if (data.mon == "Hóa") {
            transcript.HKI.diemHoa.diemMieng = list
            transcript.HKI.diemHoa.diem15p = list1
            transcript.HKI.diemHoa.diem1tiet = list2
            transcript.HKI.diemHoa.diemGiuaKy = data.bangDiem.GKI
            transcript.HKII.diemHoa.diemGiuaKy = data.bangDiem.GKII
            transcript.HKII.diemHoa.diemMieng = list3
            transcript.HKII.diemHoa.diem15p = list4
            transcript.HKII.diemHoa.diem1tiet = list5
            transcript.HKI.diemHoa.diemCuoiKy = data.bangDiem.CKI
            transcript.HKII.diemHoa.diemCuoiKy = data.bangDiem.CKII
            transcript.HKII.diemHoa.diemTB = data.bangDiem.canam
            transcript.idHocSinh = data.idHocSinh
            // transcript.diemAnh.HKI.diemTB = 
            transcript.soHieu = data.soHieu
            let TBMHKI = 0
            let TBMHKII = 0

            TBMHKI = caculateTBM(transcript.HKI.diemHoa.diemMieng, transcript.HKI.diemHoa.diem15p, transcript.HKI.diemHoa.diem1tiet, transcript.HKI.diemHoa.diemGiuaKy, transcript.HKI.diemHoa.diemCuoiKy)
            TBMHKII = caculateTBM(transcript.HKII.diemHoa.diemMieng, transcript.HKII.diemHoa.diem15p, transcript.HKII.diemHoa.diem1tiet, transcript.HKII.diemHoa.diemGiuaKy, transcript.HKII.diemHoa.diemCuoiKy)


            transcript.HKI.diemHoa.diemTB = TBMHKI
            transcript.HKII.diemHoa.diemTB = TBMHKII
            if (TBMHKI == "" || TBMHKII == "") {
                transcript.HKII.diemHoa.TBCN = ''
            } else {
                transcript.HKII.diemHoa.TBCN = ((Number(TBMHKI) + (Number(TBMHKII) * 2)) / 3).toFixed(1)
            }

            await transcript.save()
        }
        if (data.mon == "Công Nghệ") {
            transcript.HKI.diemCongNghe.diemMieng = list
            transcript.HKI.diemCongNghe.diem15p = list1
            transcript.HKI.diemCongNghe.diem1tiet = list2
            transcript.HKI.diemCongNghe.diemGiuaKy = data.bangDiem.GKI
            transcript.HKII.diemCongNghe.diemGiuaKy = data.bangDiem.GKII
            transcript.HKII.diemCongNghe.diemMieng = list3
            transcript.HKII.diemCongNghe.diem15p = list4
            transcript.HKII.diemCongNghe.diem1tiet = list5
            transcript.HKI.diemCongNghe.diemCuoiKy = data.bangDiem.CKI
            transcript.HKII.diemCongNghe.diemCuoiKy = data.bangDiem.CKII
            transcript.HKII.diemCongNghe.diemTB = data.bangDiem.canam
            transcript.idHocSinh = data.idHocSinh
            // transcript.diemAnh.HKI.diemTB = 
            transcript.soHieu = data.soHieu
            let TBMHKI = 0
            let TBMHKII = 0

            TBMHKI = caculateTBM(transcript.HKI.diemCongNghe.diemMieng, transcript.HKI.diemCongNghe.diem15p, transcript.HKI.diemCongNghe.diem1tiet, transcript.HKI.diemCongNghe.diemGiuaKy, transcript.HKI.diemCongNghe.diemCuoiKy)
            TBMHKII = caculateTBM(transcript.HKII.diemCongNghe.diemMieng, transcript.HKII.diemCongNghe.diem15p, transcript.HKII.diemCongNghe.diem1tiet, transcript.HKII.diemCongNghe.diemGiuaKy, transcript.HKII.diemCongNghe.diemCuoiKy)


            transcript.HKI.diemCongNghe.diemTB = TBMHKI
            transcript.HKII.diemCongNghe.diemTB = TBMHKII
            if (TBMHKI == "" || TBMHKII == "") {
                transcript.HKII.diemCongNghe.TBCN = ''
            } else {
                transcript.HKII.diemCongNghe.TBCN = ((Number(TBMHKI) + (Number(TBMHKII) * 2)) / 3).toFixed(1)
            }

            await transcript.save()
        }
        if (data.mon == "Tin") {
            transcript.HKI.diemTin.diemMieng = list
            transcript.HKI.diemTin.diem15p = list1
            transcript.HKI.diemTin.diem1tiet = list2
            transcript.HKI.diemTin.diemGiuaKy = data.bangDiem.GKI
            transcript.HKII.diemTin.diemGiuaKy = data.bangDiem.GKII
            transcript.HKII.diemTin.diemMieng = list3
            transcript.HKII.diemTin.diem15p = list4
            transcript.HKII.diemTin.diem1tiet = list5
            transcript.HKI.diemTin.diemCuoiKy = data.bangDiem.CKI
            transcript.HKII.diemTin.diemCuoiKy = data.bangDiem.CKII
            transcript.HKII.diemTin.diemTB = data.bangDiem.canam
            transcript.idHocSinh = data.idHocSinh
            // transcript.diemAnh.HKI.diemTB = 
            transcript.soHieu = data.soHieu
            let TBMHKI = 0
            let TBMHKII = 0

            TBMHKI = caculateTBM(transcript.HKI.diemTin.diemMieng, transcript.HKI.diemTin.diem15p, transcript.HKI.diemTin.diem1tiet, transcript.HKI.diemTin.diemGiuaKy, transcript.HKI.diemTin.diemCuoiKy)
            TBMHKII = caculateTBM(transcript.HKII.diemTin.diemMieng, transcript.HKII.diemTin.diem15p, transcript.HKII.diemTin.diem1tiet, transcript.HKII.diemTin.diemGiuaKy, transcript.HKII.diemTin.diemCuoiKy)


            transcript.HKI.diemTin.diemTB = TBMHKI
            transcript.HKII.diemTin.diemTB = TBMHKII
            if (TBMHKI == "" || TBMHKII == "") {
                transcript.HKII.diemTin.TBCN = ''
            } else {
                transcript.HKII.diemTin.TBCN = ((Number(TBMHKI) + (Number(TBMHKII) * 2)) / 3).toFixed(1)
            }

            await transcript.save()
        }
        if (data.mon == "Mỹ Thuật") {
            transcript.HKI.diemMyThuat.diemMieng = list
            transcript.HKI.diemMyThuat.diem15p = list1
            transcript.HKI.diemMyThuat.diem1tiet = list2
            transcript.HKI.diemMyThuat.diemGiuaKy = data.bangDiem.GKI
            transcript.HKII.diemMyThuat.diemGiuaKy = data.bangDiem.GKII
            transcript.HKII.diemMyThuat.diemMieng = list3
            transcript.HKII.diemMyThuat.diem15p = list4
            transcript.HKII.diemMyThuat.diem1tiet = list5
            transcript.HKI.diemMyThuat.diemCuoiKy = data.bangDiem.CKI
            transcript.HKII.diemMyThuat.diemCuoiKy = data.bangDiem.CKII
            transcript.HKII.diemMyThuat.diemTB = data.bangDiem.canam
            transcript.idHocSinh = data.idHocSinh
            // transcript.diemAnh.HKI.diemTB = 
            transcript.soHieu = data.soHieu
            let TBMHKI = 0
            let TBMHKII = 0

            TBMHKI = caculateTBM(transcript.HKI.diemMyThuat.diemMieng, transcript.HKI.diemMyThuat.diem15p, transcript.HKI.diemMyThuat.diem1tiet, transcript.HKI.diemMyThuat.diemGiuaKy, transcript.HKI.diemMyThuat.diemCuoiKy)
            TBMHKII = caculateTBM(transcript.HKII.diemMyThuat.diemMieng, transcript.HKII.diemMyThuat.diem15p, transcript.HKII.diemMyThuat.diem1tiet, transcript.HKII.diemMyThuat.diemGiuaKy, transcript.HKII.diemMyThuat.diemCuoiKy)


            transcript.HKI.diemMyThuat.diemTB = TBMHKI
            transcript.HKII.diemMyThuat.diemTB = TBMHKII
            if (TBMHKI == "" || TBMHKII == "") {
                transcript.HKII.diemMyThuat.TBCN = ''
            } else {
                transcript.HKII.diemMyThuat.TBCN = ((Number(TBMHKI) + (Number(TBMHKII) * 2)) / 3).toFixed(1)
            }

            await transcript.save()
        }
        if (data.mon == "GDCD") {
            transcript.HKI.diemGDCD.diemMieng = list
            transcript.HKI.diemGDCD.diem15p = list1
            transcript.HKI.diemGDCD.diem1tiet = list2
            transcript.HKI.diemGDCD.diemGiuaKy = data.bangDiem.GKI
            transcript.HKII.diemGDCD.diemGiuaKy = data.bangDiem.GKII
            transcript.HKII.diemGDCD.diemMieng = list3
            transcript.HKII.diemGDCD.diem15p = list4
            transcript.HKII.diemGDCD.diem1tiet = list5
            transcript.HKI.diemGDCD.diemCuoiKy = data.bangDiem.CKI
            transcript.HKII.diemGDCD.diemCuoiKy = data.bangDiem.CKII
            transcript.HKII.diemGDCD.diemTB = data.bangDiem.canam
            transcript.idHocSinh = data.idHocSinh
            // transcript.diemAnh.HKI.diemTB = 
            transcript.soHieu = data.soHieu
            let TBMHKI = 0
            let TBMHKII = 0

            TBMHKI = caculateTBM(transcript.HKI.diemGDCD.diemMieng, transcript.HKI.diemGDCD.diem15p, transcript.HKI.diemGDCD.diem1tiet, transcript.HKI.diemGDCD.diemGiuaKy, transcript.HKI.diemGDCD.diemCuoiKy)
            TBMHKII = caculateTBM(transcript.HKII.diemGDCD.diemMieng, transcript.HKII.diemGDCD.diem15p, transcript.HKII.diemGDCD.diem1tiet, transcript.HKII.diemGDCD.diemGiuaKy, transcript.HKII.diemGDCD.diemCuoiKy)


            transcript.HKI.diemGDCD.diemTB = TBMHKI
            transcript.HKII.diemGDCD.diemTB = TBMHKII
            if (TBMHKI == "" || TBMHKII == "") {
                transcript.HKII.diemGDCD.TBCN = ''
            } else {
                transcript.HKII.diemGDCD.TBCN = ((Number(TBMHKI) + (Number(TBMHKII) * 2)) / 3).toFixed(1)
            }

            await transcript.save()
        }

        if (data.mon == "Thể Dục") {
            transcript.HKI.diemTheDuc.diemMieng = list
            transcript.HKI.diemTheDuc.diem15p = list1
            transcript.HKI.diemTheDuc.diem1tiet = list2
            transcript.HKI.diemTheDuc.diemGiuaKy = data.bangDiem.GKI
            transcript.HKII.diemTheDuc.diemGiuaKy = data.bangDiem.GKII
            transcript.HKII.diemTheDuc.diemMieng = list3
            transcript.HKII.diemTheDuc.diem15p = list4
            transcript.HKII.diemTheDuc.diem1tiet = list5
            transcript.HKI.diemTheDuc.diemCuoiKy = data.bangDiem.CKI
            transcript.HKII.diemTheDuc.diemCuoiKy = data.bangDiem.CKII
            transcript.HKII.diemTheDuc.diemTB = data.bangDiem.canam
            transcript.idHocSinh = data.idHocSinh
            // transcript.diemAnh.HKI.diemTB = 
            transcript.soHieu = data.soHieu
            let TBMHKI = 0
            let TBMHKII = 0

            TBMHKI = caculateTBM(transcript.HKI.diemTheDuc.diemMieng, transcript.HKI.diemTheDuc.diem15p, transcript.HKI.diemTheDuc.diem1tiet, transcript.HKI.diemTheDuc.diemGiuaKy, transcript.HKI.diemTheDuc.diemCuoiKy)
            TBMHKII = caculateTBM(transcript.HKII.diemTheDuc.diemMieng, transcript.HKII.diemTheDuc.diem15p, transcript.HKII.diemTheDuc.diem1tiet, transcript.HKII.diemTheDuc.diemGiuaKy, transcript.HKII.diemTheDuc.diemCuoiKy)


            transcript.HKI.diemTheDuc.diemTB = TBMHKI
            transcript.HKII.diemTheDuc.diemTB = TBMHKII
            if (TBMHKI == "" || TBMHKII == "") {
                transcript.HKII.diemTheDuc.TBCN = ''
            } else {
                transcript.HKII.diemTheDuc.TBCN = ((Number(TBMHKI) + (Number(TBMHKII) * 2)) / 3).toFixed(1)
            }

            await transcript.save()
        }
        if (transcript.HKII.diemAnh.TBCN &&
            transcript.HKII.diemToan.TBCN &&
            transcript.HKII.diemVan.TBCN &&
            transcript.HKII.diemLy.TBCN&&
            transcript.HKII.diemHoa.TBCN&&
            transcript.HKII.diemSinh.TBCN&&
            transcript.HKII.diemSu.TBCN &&
            transcript.HKII.diemDia.TBCN &&
            transcript.HKII.diemCongNghe.TBCN&&
            transcript.HKII.diemTheDuc.TBCN&&
            transcript.HKII.diemMyThuat.TBCN&&
            transcript.HKII.diemTin.TBCN&&
            transcript.HKII.diemGDCD.TBCN 
        ) {
            transcript.TBMCN = ((Number(transcript.HKII.diemAnh.TBCN) + Number(transcript.HKII.diemDia.TBCN) + Number(transcript.HKII.diemSu.TBCN)
                + Number(transcript.HKII.diemSinh.TBCN) + Number(transcript.HKII.diemHoa.TBCN) + Number(transcript.HKII.diemLy.TBCN)
                + Number(transcript.HKII.diemVan.TBCN) + Number(transcript.HKII.diemToan.TBCN) + Number(transcript.HKII.diemGDCD.TBCN)
                + Number(transcript.HKII.diemTin.TBCN) + Number(transcript.HKII.diemMyThuat.TBCN) + Number(transcript.HKII.diemTheDuc.TBCN)
                + Number(transcript.HKII.diemCongNghe.TBCN)) / 13).toFixed(1)
            //Xếp loại
            if (transcript.TBMCN >= 8) {
                if (transcript.HKII.diemAnh.TBCN >= 6.5 &&
                    transcript.HKII.diemLy.TBCN >= 6.5 &&
                    transcript.HKII.diemHoa.TBCN >= 6.5 &&
                    transcript.HKII.diemSinh.TBCN >= 6.5 &&
                    transcript.HKII.diemSu.TBCN >= 6.5 &&
                    transcript.HKII.diemDia.TBCN >= 6.5 &&
                    transcript.HKII.diemCongNghe.TBCN >= 6.5 &&
                    transcript.HKII.diemTheDuc.TBCN >= 6.5 &&
                    transcript.HKII.diemMyThuat.TBCN >= 6.5 &&
                    transcript.HKII.diemTin.TBCN >= 6.5 &&
                    transcript.HKII.diemGDCD.TBCN >= 6.5) {
                    if (transcript.HKII.diemToan.TBCN >= 8 ||
                        transcript.HKII.diemVan.TBCN >= 8) {
                        transcript.xepLoai = "Giỏi"
                    }
                }
            }
            else if (transcript.TBMCN >= 6.5 && transcript.TBMCN < 8) {
                if (transcript.HKII.diemAnh.TBCN >= 5 &&
                    transcript.HKII.diemLy.TBCN >= 5 &&
                    transcript.HKII.diemHoa.TBCN >= 5 &&
                    transcript.HKII.diemSinh.TBCN > 5 &&
                    transcript.HKII.diemSu.TBCN >= 5 &&
                    transcript.HKII.diemDia.TBCN >= 5 &&
                    transcript.HKII.diemCongNghe.TBCN >= 5 &&
                    transcript.HKII.diemTheDuc.TBCN >= 5 &&
                    transcript.HKII.diemMyThuat.TBCN >= 5 &&
                    transcript.HKII.diemTin.TBCN >= 5 &&
                    transcript.HKII.diemGDCD.TBCN >= 5) {
                    if (transcript.HKII.diemToan.TBCN >= 6.5 ||
                        transcript.HKII.diemVan.TBCN >= 6.5) {
                        transcript.xepLoai = "Khá"
                    }
                    else{
                        transcript.xepLoai = "Trung Bình"
                    }
                }
            }
            else if (transcript.TBMCN >= 5 && transcript.TBMCN < 6.5) {
                if (transcript.HKII.diemAnh.TBCN >= 3.5 &&
                    transcript.HKII.diemLy.TBCN >= 3.5 &&
                    transcript.HKII.diemHoa.TBCN >= 3.5 &&
                    transcript.HKII.diemSinh.TBCN > 5 &&
                    transcript.HKII.diemSu.TBCN >= 3.5 &&
                    transcript.HKII.diemDia.TBCN >= 3.5 &&
                    transcript.HKII.diemCongNghe.TBCN >= 3.5 &&
                    transcript.HKII.diemTheDuc.TBCN >= 3.5 &&
                    transcript.HKII.diemMyThuat.TBCN >= 3.5 &&
                    transcript.HKII.diemTin.TBCN >= 3.5 &&
                    transcript.HKII.diemGDCD.TBCN >= 3.5) {
                    if (transcript.HKII.diemToan.TBCN >= 5 ||
                        transcript.HKII.diemVan.TBCN >= 5) {
                        transcript.xepLoai = "Trung Bình"
                    } else{
                        transcript.xepLoai = "Yếu"

                    }
                }
            }
            else if (transcript.TBMCN >= 2 && transcript.TBMCN < 5) {
                if (transcript.HKII.diemAnh.TBCN >= 2 &&
                    transcript.HKII.diemLy.TBCN >= 2 &&
                    transcript.HKII.diemHoa.TBCN >= 2 &&
                    transcript.HKII.diemSinh.TBCN > 5 &&
                    transcript.HKII.diemSu.TBCN >= 2 &&
                    transcript.HKII.diemDia.TBCN >= 2 &&
                    transcript.HKII.diemCongNghe.TBCN >= 2 &&
                    transcript.HKII.diemTheDuc.TBCN >= 2 &&
                    transcript.HKII.diemMyThuat.TBCN >= 2 &&
                    transcript.HKII.diemTin.TBCN >= 2 &&
                    transcript.HKII.diemGDCD.TBCN >= 2) {
                    transcript.xepLoai = "Yếu"
                }
            }
            else {
                transcript.xepLoai = "Kém"
            }

            //Xếp hạng
            let listtranscript = await Transcript.find({soHieu:transcript.soHieu}).sort({TBMCN:-1})
            for (let i=0;i<=listtranscript.length;i++){
              
                if(transcript.idHocSinh==listtranscript[i].idHocSinh){
                    transcript.xepHang=i+1
                    await transcript.save()
                }
               
               
            }
            await transcript.save()
            
        }

    



        return {
            transcript,
            status: 200
        }
    
    }
    else {
        return {

            status: 500,
            message: "Không tìm thấy bản điểm của học sinh"
        }
    }
    // let transcript = new Transcript()


}
const importexcel = async function (data) {

    for (let a = 0; a <= data.diem.length; a++) {

        let transcript = await Transcript.findOne({ idHocSinh: data.diem[a].idHocSinh });
        if (transcript) {
            if (data.mon == "Anh") {
                if (data.diem[a].diem15pHKI) {
                    let tam = ''
                    let diem = data.diem[a].diem15pHKI + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKI.diemAnh.diem15p.push({diem:tam})
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diem15pHKII) {
                    let tam = ''
                    let diem = data.diem[a].diem15pHKII + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKII.diemAnh.diem15p.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diemMiengHKI) {
                    let tam = ''
                    let diem = data.diem[a].diemMiengHKI + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKI.diemAnh.diemMieng.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diemMiengHKII) {
                    let tam = ''
                    let diem = data.diem[a].diemMiengHKII + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKII.diemAnh.diemMieng.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diem1tietHKI) {
                    let tam = ''
                    let diem = data.diem[a].diem1tietHKI + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKI.diemAnh.diem1tiet.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diem1tietHKII) {
                    let tam = ''
                    let diem = data.diem[a].diem1tietHKII + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKII.diemAnh.diem1tiet.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                transcript.HKI.diemAnh.diemGiuaKy = data.diem[a].diemgiuaKyHKI
                transcript.HKII.diemAnh.diemGiuaKy = data.diem[a].diemgiuaKyHKII

                transcript.HKI.diemAnh.diemCuoiKy = data.diem[a].diemcuoiKyHKI
                transcript.HKII.diemAnh.diemCuoiKy = data.diem[a].diemcuoiKyHKII

                transcript.HKII.diemAnh.diemTB = data.diem[a].tbm
            }
            if (data.mon == "Toán") {
                if (data.diem[a].diem15pHKI) {
                    let tam = ''
                    let diem = data.diem[a].diem15pHKI + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKI.diemToan.diem15p.push({diem:tam})
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diem15pHKII) {
                    let tam = ''
                    let diem = data.diem[a].diem15pHKII + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKII.diemToan.diem15p.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diemMiengHKI) {
                    let tam = ''
                    let diem = data.diem[a].diemMiengHKI + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKI.diemToan.diemMieng.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diemMiengHKII) {
                    let tam = ''
                    let diem = data.diem[a].diemMiengHKII + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKII.diemToan.diemMieng.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diem1tietHKI) {
                    let tam = ''
                    let diem = data.diem[a].diem1tietHKI + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKI.diemToan.diem1tiet.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diem1tietHKII) {
                    let tam = ''
                    let diem = data.diem[a].diem1tietHKII + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKII.diemToan.diem1tiet.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                transcript.HKI.diemToan.diemGiuaKy = data.diem[a].diemgiuaKyHKI
                transcript.HKII.diemToan.diemGiuaKy = data.diem[a].diemgiuaKyHKII

                transcript.HKI.diemToan.diemCuoiKy = data.diem[a].diemcuoiKyHKI
                transcript.HKII.diemToan.diemCuoiKy = data.diem[a].diemcuoiKyHKII

                transcript.HKII.diemToan.diemTB = data.diem[a].tbm
            }


            if (data.mon == "Văn") {
                if (data.diem[a].diem15pHKI) {
                    let tam = ''
                    let diem = data.diem[a].diem15pHKI + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKI.diemVan.diem15p.push({diem:tam})
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diem15pHKII) {
                    let tam = ''
                    let diem = data.diem[a].diem15pHKII + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKII.diemVan.diem15p.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diemMiengHKI) {
                    let tam = ''
                    let diem = data.diem[a].diemMiengHKI + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKI.diemVan.diemMieng.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diemMiengHKII) {
                    let tam = ''
                    let diem = data.diem[a].diemMiengHKII + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKII.diemVan.diemMieng.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diem1tietHKI) {
                    let tam = ''
                    let diem = data.diem[a].diem1tietHKI + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKI.diemVan.diem1tiet.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                if (data.diem[a].diem1tietHKII) {
                    let tam = ''
                    let diem = data.diem[a].diem1tietHKII + ","
                    for (let i = 0; i <= diem.length; i++) {
                        if (diem[i] != ",") {
                            tam = tam + diem[i]
                        }
                        if (diem[i] == ",") {
                            transcript.HKII.diemVan.diem1tiet.push({diem:tam});
                            tam = '';
                        }
                    }
                }
                transcript.HKI.diemVan.diemGiuaKy = data.diem[a].diemgiuaKyHKI
                transcript.HKII.diemVan.diemGiuaKy = data.diem[a].diemgiuaKyHKII

                transcript.HKI.diemVan.diemCuoiKy = data.diem[a].diemcuoiKyHKI
                transcript.HKII.diemVan.diemCuoiKy = data.diem[a].diemcuoiKyHKII

                transcript.HKII.diemVan.diemTB = data.diem[a].tbm
            }


        }
        await transcript.save()

    }

    return {
        message: "Thành Công",
        status: 200
    }

}







const updatecomment = async function (data) {

    let transcript = await Transcript.findOne({ idHocSinh: data.idHocSinh });

    if(transcript){
        let curentdate=new Date()
        let mounth=moment( curentdate).format("MM")
        if(mounth==01){
            transcript.nhanXet.thang1=data.nhanxet
        }
        if(mounth==02){
            transcript.nhanXet.thang2=data.nhanxet
        }
        if(mounth==03){
            transcript.nhanXet.thang3=data.nhanxet
        }
        if(mounth==04){
            transcript.nhanXet.thang4=data.nhanxet
        }
        if(mounth==05){
            transcript.nhanXet.thang5=data.nhanxet
        }
        if(mounth==09){
            transcript.nhanXet.thang9=data.nhanxet
        }
        if(mounth==10){
            transcript.nhanXet.thang10=data.nhanxet
        }
        if(mounth==11){
            transcript.nhanXet.thang11=data.nhanxet
        }
        if(mounth==12){
            transcript.nhanXet.thang12=data.nhanxet
        }

        transcript.nhanXet.caNam=data.nhanxet
        await transcript.save();
        return {
        transcript,
        status: 200
    }
    }else{
        return{message:"Không có bảng điểm của học sinh này"} 
    }
    



}


module.exports = {
    gettranscript: gettranscript,
    getalltranscriptbysub: getalltranscriptbysub,
    getalltranscript: getalltranscript,
    gettranscriptsub: gettranscriptsub,
    inserttranscript: inserttranscript,
    importexcel: importexcel,
    updatecomment:updatecomment

}