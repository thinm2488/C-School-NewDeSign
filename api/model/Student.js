var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StudentSchema = new Schema(
    {
        idTao:{type:String},
        nienKhoa:{type:String},
        tenHocSinh: { type: String },
        maSoHocSinh: { type: String },
        gioiTinh: { type: String },
        ngaySinh: { type: String },
        queQuan: { type: String },
        soHieu: { type: String },
        diaChi: { type: String },
        khoi: { type: String },
        hinh: { type: String, default: "hero-bg.jpg" },
        bangDiem: [{
            toan: [{
                diem15p: [{
                    
                }

                ],
                diem1Tiet: [

                ],
                diem15p: [

                ],
                diemGK:{type:Number},
                diemCK:{type:Number},
                TBM:{type:Number}
            }],
            anh: [{
                diem15p: [{
                    
                }

                ],
                diem1Tiet: [

                ],
                diem15p: [

                ],
                diemGK:{type:Number},
                diemCK:{type:Number},
                TBM:{type:Number}
            }],
            van: [{
                diem15p: [{
                    
                }

                ],
                diem1Tiet: [

                ],
                diem15p: [

                ],
                diemGK:{type:Number},
                diemCK:{type:Number},
                TBM:{type:Number}
            }],
            ly: [{
                diem15p: [{
                    
                }

                ],
                diem1Tiet: [

                ],
                diem15p: [

                ],
                diemGK:{type:Number},
                diemCK:{type:Number},
                TBM:{type:Number}
            }],
            hoa: [{
                diem15p: [{
                    
                }

                ],
                diem1Tiet: [

                ],
                diem15p: [

                ],
                diemGK:{type:Number},
                diemCK:{type:Number},
                TBM:{type:Number}
            }],
            sinh: [{
                diem15p: [{
                    
                }

                ],
                diem1Tiet: [

                ],
                diem15p: [

                ],
                diemGK:{type:Number},
                diemCK:{type:Number},
                TBM:{type:Number}
            }],
            su: [{
                diem15p: [{
                    
                }

                ],
                diem1Tiet: [

                ],
                diem15p: [

                ],
                diemGK:{type:Number},
                diemCK:{type:Number},
                TBM:{type:Number}
            }],
            dia: [{
                diem15p: [{
                    
                }

                ],
                diem1Tiet: [

                ],
                diem15p: [

                ],
                diemGK:{type:Number},
                diemCK:{type:Number},
                TBM:{type:Number}
            }],
            congnghe: [{
                diem15p: [{
                    
                }

                ],
                diem1Tiet: [

                ],
                diem15p: [

                ],
                diemGK:{type:Number},
                diemCK:{type:Number},
                TBM:{type:Number}
            }],
            mythuat: [{
                diem15p: [{
                    
                }

                ],
                diem1Tiet: [

                ],
                diem15p: [

                ],
                diemGK:{type:Number},
                diemCK:{type:Number},
                TBM:{type:Number}
            }],
            tin: [{
                diem15p: [{
                    
                }

                ],
                diem1Tiet: [

                ],
                diem15p: [

                ],
                diemGK:{type:Number},
                diemCK:{type:Number},
                TBM:{type:Number}
            }],
            theduc: [{
                diem15p: [{
                    
                }

                ],
                diem1Tiet: [

                ],
                diem15p: [

                ],
                diemGK:{type:Number},
                diemCK:{type:Number},
                TBM:{type:Number}
            }],
            dgcd: [{
                diem15p: [{
                    
                }

                ],
                diem1Tiet: [

                ],
                diem15p: [

                ],
                diemGK:{type:Number},
                diemCK:{type:Number},
                TBM:{type:Number}
            }],
        }],
        




    }
);
module.exports = mongoose.model('Student', StudentSchema)