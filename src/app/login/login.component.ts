import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { ApiService } from '../service/api.service'
import User from '../model/User'
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;
  check: boolean = false
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private cookieService: CookieService, private lg: ApiService) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      soDienThoai: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  login(soDienThoai, password) {

    this.check = false
    this.lg.login(soDienThoai, password).subscribe(data => {


      this.user = Object.assign(data)
      var tenNguoiDung = this.user.user.tenNguoiDung;
      var hinh = this.user.user.hinh;
      var id = this.user.user._id
      var role = this.user.user.role

      if (this.user.user.GVCN) {
        var GVCN = this.user.user.GVCN
        this.cookieService.set('GVCN', GVCN.toString());
      }
      if (this.user.user.status == 500) {
        window.alert(this.user.user.message)

      }

      else {
        if (role == "gv" || role == "bgh") {
          var chuyenmon = this.user.user.mon

          this.cookieService.set('tenNguoiDung', tenNguoiDung.toString());
          this.cookieService.set('hinh', hinh.toString());
          this.cookieService.set('id', id.toString());
          this.cookieService.set('role', role.toString());
          this.cookieService.set('chuyenmon', chuyenmon.toString());

          window.alert("Đăng Nhập Thành Công!!");
          window.location.href = '/dashboard'
          return data
        }
        else {
          window.alert("Số điện thoại không có quyền truy cập mời bạn thử lại bằng app cho phụ huynh");
        }
      }

    });





  }
  ngOnInit() {
  }


}
