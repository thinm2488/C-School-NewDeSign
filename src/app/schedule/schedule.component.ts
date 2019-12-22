import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ScheduleService } from '../service/schedule.service';
import { Button } from 'protractor';
import { ExcelService } from '../service/excel.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import Schedule from '../model/Schedule'
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  lop: string
  danhsachkhoi = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  danhsachlop: any;
  khoilop: String;
  soHieu: String;
  liststudent: any
  Schedule: Schedule;
  editschedule: Schedule
  checkshow: boolean = false
  checksua: boolean = false
  checkdanhsach: boolean = false
  searchText;

  constructor(private apiService: ApiService, private scheduleservice: ScheduleService) { }

  ngOnInit() {

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
  gethocsinh(lop) {

    this.lop = lop
    this.scheduleservice.getschedule(lop)
      .subscribe(data => {
        var res = Object.assign(data)
        this.Schedule = res.schedule
        if (res.schedule.thuhai.listmonhoc.length > 0) {
          this.checkshow = true
          
        } else {
          this.checkdanhsach = true
        }


        //  th=res.list.liststudent
        //for (let index = 0; index < user.length; index++) {

        // this.innitDatatable(this.liststudent.list.liststudent);

      }
      )
  }
  tao() {
    let data = {
      
      soHieu: this.lop,
        listmonhoc: [
          {
            mon: "Văn",
            thoiGian: "7:00 - 7:45",
            tenGiaoVien: "Nguyễn Minh Thơ",
          },
          {
            mon: "Văn",
            thoiGian: "7:50 - 8:25",
            tenGiaoVien: "Nguyễn Minh Thơ",
          },
          {
            mon: "Văn",
            thoiGian: "9:00 - 9:45",
            tenGiaoVien: "Nguyễn Minh Thơ",
          },
          {
            mon: "Văn",
            thoiGian: "9:50 - 10:25",
            tenGiaoVien: "Nguyễn Minh Thơ",
          },
          {
            mon: "Văn",
            thoiGian: "10:30 - 11:25",
            tenGiaoVien: "Nguyễn Minh Thơ",
          }
        ]
    }
    this.scheduleservice.create(data).subscribe(data=>{
      let res =Object.assign(data)
    })
  }

getObj(schedule) {

  this.checksua = true
  this.checkshow = false

}
update(schedule) {
  var data = schedule
  console.log(data)
  this.scheduleservice.updateschedule(data).subscribe(data => {
    let res = Object.assign(data)
    this.checksua = false
    this.checkshow = true
    this.Schedule = res.schedule

  })
}
back() {
  this.checksua = false
  this.checkshow = true
}
}
