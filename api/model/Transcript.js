var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TranscriptSchema = new Schema(
    {

        nienKhoa: { type: String },
        GVCN: { type: String },
        tenGV: { type: String },
        soHieu: { type: String },
        idHocSinh: { type: String },
        tenHocSinh: { type: String },
        TBMCN: { type: String },
        xepLoai: { type: String },
        xepHang: { type: String },
        hanhKiem: { type: String },
        nhanXet: { type: String },

        HKI: {
            diemAnh:
            {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
     
               

            },

            diemToan: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                
            },
            diemVan: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
               
            },
            diemSinh: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                
            },
            diemSu: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                
            },
            diemDia: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
               
            },
            diemCongNghe: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                
            },
            diemLy: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
              
            },
            diemHoa: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
              
            },
            diemGDCD: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
               
            },
            diemTin: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
             
            },
            diemTheDuc: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
            },
            diemMyThuat: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
            },



        },
        HKII: {
            diemAnh:
            {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                TBCN: { type: String, default: "" }
            },

            diemToan: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                TBCN: { type: String, default: "" }
            },
            diemVan: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                TBCN: { type: String, default: "" }
            },
            diemSinh: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                TBCN: { type: String, default: "" }
            },
            diemSu: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                TBCN: { type: String, default: "" }
            },
            diemDia: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                TBCN: { type: String, default: "" }
            },
            diemCongNghe: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                TBCN: { type: String, default: "" }
            },
            diemLy: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                TBCN: { type: String, default: "" }
            },
            diemHoa: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                TBCN: { type: String, default: "" }
            },
            diemGDCD: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                TBCN: { type: String, default: "" }
            },
            diemTin: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                TBCN: { type: String, default: "" }
            },
            diemTheDuc: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                TBCN: { type: String, default: "" }
            },
            diemMyThuat: {
                diemMieng: [],
                diem15p: [],
                diem1tiet: [],
                diemGiuaKy: { type: String, default: "" },
                diemCuoiKy: { type: String, default: "" },
                diemTB: { type: String, default: "" },
                TBCN: { type: String, default: "" }
            },






        }
    }
);
module.exports = mongoose.model('Transcript', TranscriptSchema)