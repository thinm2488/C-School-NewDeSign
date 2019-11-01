import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import User from '../model/User'
import { ApiService } from '../service/api.service';
import { Button } from 'protractor';
import { ExcelService } from '../service/excel.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Observer } from 'rxjs'
import { from } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  http: HttpClient
  userlist: any
  accountForm: FormGroup
  User: any
  importfile: Array<User> = []
  danhsachkhoi = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  danhsachhocsinh: [];
  danhsachlop: [];
  khoilop: String;
  soHieu: String;
  hocsinh: any;
  res: any;
  checksua: boolean = false
  checktao: boolean = true
  modalRef: BsModalRef;
  searchText;
  constructor(private modalService: BsModalService, private cookies: CookieService, private fb: FormBuilder, private excelService: ExcelService, private apiService: ApiService) {
    this.createform();
  }

  ngOnInit(): void {
    this.getdanhsach()

  };
  getdanhsach() {
    var users
    this.apiService.getalluser()
      .subscribe(data => {
        users = Object.assign(data)
        this.userlist = users.userlist
        //for (let index = 0; index < user.length; index++) {

        // this.innitDatatable(this.userlist.userlist);
      }
      )
    console.log(this.userlist)
  }
  getlop(khoi) {
    let data = {
      khoi: khoi
    }
    window.alert()

    this.apiService.getlistclass(data).subscribe(res => {
      let danhsachlop = Object.assign(res)
      this.danhsachlop = danhsachlop.classes.Classes;

    })
  }



  gethocsinh(lop) {

    this.apiService.getliststudent(lop).subscribe(res => {
      let student = Object.assign(res)
      this.danhsachhocsinh = student.list.liststudent;
    })
  }
  // tenHocSinh:String;
  tao(tenNguoiDung, soDienThoai) {
    var id = this.cookies.get('id')
    let data = {
      idTao: id,
      tenNguoiDung: tenNguoiDung,
      soDienThoai: soDienThoai,
      HocSinh: this.hocsinh


    }

    this.apiService.createUser(data).subscribe(res => {
      this.User = Object.assign(res)
      window.alert(this.User.user.message)
      if (this.User.user.status == 200) {
        this.getdanhsach()
      }
    })

  }
  sua() {
    let data = {
      soDienThoai: this.User.soDienThoai,
      hocSinh: this.hocsinh

    }
    this.apiService.updateUser(data).subscribe(data => {
      let res = Object.assign(data)
    })
  }
  Xoa() {

    this.apiService.deleteUser(this.User._id).subscribe(data => {
      var res = Object.assign(data)
      if (res.user.status == 200) {
        window.alert("Xóa Thành Công!!")
        this.close()
        this.getdanhsach()
        this.checksua = false
        this.checktao = true
      }
    })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  close() {
    this.modalRef.hide();
  }
  fileUploaded: File;
  worksheet: any;
  storeData: any;
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
      this.worksheet = workbook.Sheets[first_sheet_name];
      this.importfile = XLSX.utils.sheet_to_json(this.worksheet, {
        raw: true
      })

      // this.importfile.push(this.worksheet);
    }
    readFile.readAsArrayBuffer(this.fileUploaded);

  }
  importexcel() {

    this.apiService.Importexcel(this.importfile).subscribe(data => {
      this.res = Object.assign(data)
      if (this.res.status == 200) {
        window.alert("Import file thành công!");
        this.getdanhsach()
      }
    })

  }
  createform() {
    this.accountForm = this.fb.group({
      soDienThoai: [''],
      tenNguoiDung: [''],
      khoi: [''],
      lop: [''],
      tenHocSinh: [],


    });
  }

  exportAsXLSX() {
    const listexport = new Array();
    let count = 1;
    this.userlist.userlist.forEach(element => {
      var data = {
        "STT": count++,
        "Họ Và Tên": element.tenNguoiDung,
        "Số Điện Thoại": element.soDienThoai,
        "Email": element.email

      }
      listexport.push(data);
    });

    this.excelService.exportAsExcelFile(listexport, 'Danh Sách Phụ Huynh');
  }
  back() {
    this.checksua = false
    this.checktao = true
  }
  getobj(user) {
    this.User = user
    this.checksua = true
    this.checktao = false
    // this.khoilop=this.User.quanHe[0].khoi,
    // this.soHieu=this.User.quanHe[0].soHieu,
    // this.hocsinh=this.User.quanHe[0].tenHocSinh
  }
  sort(value){
  }
}
