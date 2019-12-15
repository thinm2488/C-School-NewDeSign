import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import User from '../model/User'
import { ApiService } from '../service/api.service';
import { Button } from 'protractor';
import {ExcelService} from '../service/excel.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';  
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  Student: any
  liststudent:any
  danhsachkhoi = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  danhsachlop: any;
  khoilop: String;
  soHieu: String;
  studentForm:FormGroup;
  model;
  checksua: boolean = false
  checktao: boolean = true
  modalRef: BsModalRef;
  searchText
  constructor(private modalService: BsModalService,private cookieService:CookieService,private calendar: NgbCalendar,private fb: FormBuilder,private excelService:ExcelService,private apiService: ApiService) {
    this.createform()
   }
lop:string
  ngOnInit() {
  
    
    // console.log(this.userlist)
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  
  }
  close() {
    this.modalRef.hide();
  }
  createform() {
    this.studentForm = this.fb.group({
      tenHocSinh: [''],
      soHieu: [''],
      khoi: [''],
      gioiTinh: [''],
      ngaySinh: [''],
      diaChi: [''],
   

    });
  }
  getlop(khoi) {
    let data = {
      khoi: khoi
    }
   
  
    this.apiService.getlistclass(data).subscribe(res => {
      let danhsachlop = Object.assign(res)
      this.danhsachlop = danhsachlop.classes.Classes;
 
    })
  }
  gethocsinh(lop){

    this.lop=lop
    this.apiService.getliststudent(lop)
      .subscribe(data => {
       var res = Object.assign(data)
       this.liststudent=res.list.liststudent
        //for (let index = 0; index < user.length; index++) {

        // this.innitDatatable(this.liststudent.list.liststudent);
    
      }
      )
  }
  tao(tenHocSinh,gioiTinh,ngaySinh,diaChi,khoi,lop) {
 
    let data = {
      idTao: this.cookieService.get('id'),
    
      tenHocSinh: tenHocSinh,
      khoi: khoi,
      soHieu:this.cookieService.get('GVCN'),
      gioiTinh:gioiTinh,
      ngaySinh:ngaySinh,
      diaChi:diaChi
      

    }
    console.log(data)
   
    this.apiService.createstudent(data).subscribe(res => {
      this.Student = Object.assign(res)
      // window.alert(this.User.user.message)
      if (this.Student.status == 200) {
        window.alert("Thêm Học Sinh Thành Công")
       this.gethocsinh(lop)
      }
    })

  }
  // createform() {
  //   this.studentForm = this.fb.group({
  //     soDienThoai: [''],
  //     tenNguoiDung: [''],
  //     khoi: [''],
  //     lop: [''],
  //     tenHocSinh: [],
   

  //   });
  // }
  fileimport:any
  fileUploaded: File;  
  worksheet: any; 
  storeData: any;
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
      this.soHieu=this.worksheet.C2.v
      this.khoilop=this.worksheet.B2.v
      this.fileimport=XLSX.utils.sheet_to_json(this.worksheet,{
        raw:true
      })
      
      // this.userList.push(this.worksheet);
    }  
    readFile.readAsArrayBuffer(this.fileUploaded);  
    
  }  
  importexcel(){
   
   var data={
      idTao: this.cookieService.get('id'),
      soHieu:this.cookieService.get('GVCN'),
      khoi:this.khoilop,
      liststudent:this.fileimport
   }
    this.apiService.StudentImportexcel(data).subscribe(data=>{
      let res=Object.assign(data)
      if(res.student.status==200){
        window.alert("Import file thành công!");
        window.location.href="/home/hocsinh/danhsach"
      }
    })

  }
  exportAsXLSX(){
    const listexport = new Array();
    let count=1;
    this.liststudent.list.liststudent.forEach(element => {
     var data={
       "STT":count++,
        "Họ Và Tên":element.tenHocSinh,
         "Lớp":element.soHieu,
         "Ngày Sinh":element.ngaySinh,
         "Địa chỉ":element.diaChi
         
       }
       listexport.push(data);
    });
    var lop=Object.assign(this.soHieu)
    this.excelService.exportAsExcelFile(listexport, 'Danh Sách Học Sinh lớp '+ lop.soHieu);
  }
   selectToday() {
    this.model = this.calendar.getToday();
  }
  back() {
    this.checksua = false
    this.checktao = true
  }
  getobj(student) {
    this.Student = student
    this.checksua = true
    this.checktao = false
    // this.khoilop=this.User.quanHe[0].khoi,
    // this.soHieu=this.User.quanHe[0].soHieu,
    // this.hocsinh=this.User.quanHe[0].tenHocSinh
  }
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  fileupdate(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  
  }
  sua(ngaySinh) {
    
    const formData = new FormData();
    if(this.fileData){
      formData.append('id',this.Student._id);
      formData.append('hinh', this.fileData, this.fileData.name);
      formData.append('tenHocSinh', this.Student.tenHocSinh);
      formData.append('soHieu', this.Student.soHieu);
      formData.append('khoi', this.Student.khoi);
      formData.append('ngaySinh',ngaySinh);
      formData.append('gioiTinh', this.Student.tenHocSinh);
      formData.append('diaChi', this.Student.diaChi);
    }else{
      formData.append('id',this.Student._id);
    
      formData.append('tenHocSinh', this.Student.tenHocSinh);
      formData.append('soHieu', this.Student.soHieu);
      formData.append('khoi', this.Student.khoi);
      formData.append('ngaySinh',ngaySinh);
      formData.append('gioiTinh', this.Student.tenHocSinh);
      formData.append('diaChi', this.Student.diaChi);
    }
   
    this.apiService.updataStudent(formData).subscribe(data=>{
     let res=Object.assign(data);
      window.alert('Cập nhật thành công!')
      this.gethocsinh(this.lop)
      this.checktao=true;
      this.checksua=false
    })

  }
  Xoa(lop){
  
    this.apiService.deleteStudent(this.Student._id).subscribe(data=>{
      var res=Object.assign(data)
      if(res.status==200){
        window.alert("Xóa Thành Công!!")
        this.gethocsinh(lop)
      }
    })
  }
}
