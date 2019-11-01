import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { TranscriptService } from '../service/transcript.service'
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';  
import  FullTranscript from '../model/Fulltranscript';
import Transcript from '../model/Transcript'
@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss']
})
export class TranscriptComponent implements OnInit {
  teacher: any
  soHieu: String;
  danhsachhocsinh: any
  danhsachbangdiem: FullTranscript
  danhsachlop: any
  isshow: boolean = false;
  isshowdiem: boolean = false;
  bangDiem:any
  // Option=['Miệng','15p','1 tiết','Giữa Kỳ','Cuối Kỳ','Cả Năm']
  OptionHK=['HKI','HKII']
  diem:any
  type:String
  checksua: boolean = false
  checktao: boolean = true
  checkdetail:boolean = true
  checkHK1:boolean=false
  checkHK2:boolean=false
  checktimeHKI:boolean=true
  checktimeHKII:boolean=false
  mon:any;
  checkcanam:boolean=false
  constructor(private as: ApiService, private cookieService: CookieService, private ts:TranscriptService) { }

  ngOnInit() {
    this.mon=  this.cookieService.get('chuyenmon');
    let id = this.cookieService.get('id');
    this.getUser(id)
  }
  getUser(id){
  
    this.as.getteacher(id).subscribe(data => {
      let res = Object.assign(data);
      this.teacher = res.teacher
      this.danhsachlop = res.teacher.lopDay
      console.log(res)
    })
    this.getstudentofGVCN(this.cookieService.get('GVCN'))
  }
  gettranscriptbytype(HK){
 
    if(HK=="HKI"){
      this.checkHK1=true
      this.checkHK2=false
      this.isshowdiem=true
    }else{
      this.checkHK2=true
      this.checkHK1=false
      this.isshowdiem=true
    }
    
   
  }
  back() {
    this.checksua = false
    this.checktao = true
  }
 
  getstudent(lop) {
    this.soHieu=lop
    var data = {
      soHieu: lop,
      mon:this.cookieService.get('chuyenmon')
    }
    this.ts.getalltrancript(data).subscribe(res => {
      let ts = Object.assign(res)
      // this.danhsachbangdiem = new FullTranscript()
      this.danhsachbangdiem= ts.transcript.transcript
     
      // = student.list.liststudent;
      // this.innitDatatable(this.danhsachbangdiem)
      // this.isshow = true

    })
  }
  getobj(student) {
    this.bangDiem = student
    this.checktao = false
    this.checksua=true
  
    this.bangDiem.tenHocSinh=student.tenHocSinh;
    this.bangDiem.soHieu=student.soHieu;
    this.bangDiem.mon=this.mon;
    if(student.HKI.diem15p.length>0){
      this.bangDiem.diem15p1=student.HKI.diem15p[0].diem;
      this.bangDiem.diem15p2=student.HKI.diem15p[1].diem;
      this.bangDiem.diem15p3=student.HKI.diem15p[2].diem;
    }
    if(student.HKII.diem15p.length>0){
      this.bangDiem.diem15p4=student.HKII.diem15p[0].diem;
      this.bangDiem.diem15p5=student.HKII.diem15p[1].diem;
      this.bangDiem.diem15p6=student.HKII.diem15p[2].diem;
    }
  
   
    if(student.HKI.diemMieng.length>0){
      this.bangDiem.diemmieng1=student.HKI.diemMieng[0].diem;
      this.bangDiem.diemmieng2=student.HKI.diemMieng[1].diem;
      this.bangDiem.diemmieng3=student.HKI.diemMieng[2].diem;
    }
    if(student.HKII.diemMieng.length>0){
      this.bangDiem.diemmieng4=student.HKII.diemMieng[0].diem;
      this.bangDiem.diemmieng5=student.HKII.diemMieng[1].diem;
      this.bangDiem.diemmieng6=student.HKII.diemMieng[2].diem;
    }
  
    if(student.HKI.diem1tiet.length>0){
      this.bangDiem.diem1tiet1=student.HKI.diem1tiet[0].diem;
      this.bangDiem.diem1tiet2=student.HKI.diem1tiet[1].diem;
      this.bangDiem.diem1tiet3=student.HKI.diem1tiet[2].diem;
    }
    if(student.HKII.diem1tiet.length>0){
      this.bangDiem.diem1tiet4=student.HKII.diem1tiet[0].diem;
      this.bangDiem.diem1tiet5=student.HKII.diem1tiet[1].diem;
      this.bangDiem.diem1tiet6=student.HKII.diem1tiet[2].diem;
  
    }

  
   

  
   
    this.bangDiem.GKI= student.HKI.diemGiuaKy
    this.bangDiem.CKI= student.HKI.diemCuoiKy
    this.bangDiem.GKII= student.HKII.diemGiuaKy
    this.bangDiem.CKII= student.HKII.diemCuoiKy

   this.bangDiem.TBHKI=student.HKI.diemTB
   this.bangDiem.TBHKII=student.HKII.diemTB

    this.bangDiem.canam= student.HKII.TBCN
    if( student.HKI.diemTB==''){
      this.checktimeHKI=true
      this.checktimeHKII=false
      this.checkcanam=false
    }
    if(student.HKI.diemTB!='' &&student.HKII.diemTB=='' ){
     this.checktimeHKI=false
     this.checktimeHKII=true
     this.checkcanam=false

    }
    if(student.HKI.diemTB==''&&student.HKII.diemTB==''){
      this.checktimeHKI=true
      this.checktimeHKII=false
      this.checkcanam=false

    }
    if(student.HKI.diemTB!=''&&student.HKII.diemTB!=''){
      this.checkcanam=true
      this.checktimeHKII=false
      this.checktimeHKI=false
    }
    
  
  }

  getstudentofGVCN(sohieu) {
    var data = {
      soHieu: sohieu
    }
    this.as.getliststudent(data).subscribe(res => {
      let student = Object.assign(res)
      this.danhsachhocsinh = student.list.liststudent;
      // this.innitDatatableCN(this.danhsachhocsinh)
      this.isshow = true

    })
  }
  fileUploaded: File;  
  worksheet: any; 
  storeData: any;  
  fileimport:any 
  uploadedFile(event) {  
    this.fileUploaded = event.target.files[0];  
    this.readExcel();  
  }  
  readExcel() {  
    let readFile = new FileReader();  
    readFile.onload = (e) => {  
      this.storeData = readFile.result;  
      var data = new Uint8Array(this.storeData);  
      var arr = new Array();  
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);  
      var bstr = arr.join("");  
      var workbook = XLSX.read(bstr, { type: "binary" });  
      var first_sheet_name = workbook.SheetNames[0];  
      this.worksheet =  workbook.Sheets[first_sheet_name]; 
      this.fileimport=XLSX.utils.sheet_to_json(this.worksheet,{
        raw:true
      })
      
      // this.userList.push(this.worksheet);
    }  
    readFile.readAsArrayBuffer(this.fileUploaded);  
    
  }  
  importexcel(){
   var data={
     mon:this.cookieService.get("chuyenmon"),
     diem:this.fileimport
   }
    this.ts.importexcel(data).subscribe(data=>{
      var res=Object.assign(data)
      if(res.status==200){
        window.alert("Import file thành công!");
        window.location.href="/home/bangDiem"
      }
    })

  }
 
  insertmark(){
    var hocsinh=this.bangDiem
    var data={
      mon:this.mon,
      bangDiem:this.bangDiem,
      idHocSinh:this.bangDiem.idHocSinh,
      soHieu:this.bangDiem.soHieu,
      
      
    }
    this.ts.createtranscript(data).subscribe(data=>{
      let res=Object.assign(data)
      if(res.transcript.status==200){
        window.alert("Cập nhật điểm thành công")
        this.getstudent(this.soHieu);
        this.checksua=false
      
       
       
      }
    })
   
  
  }

}
