import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { TranscriptService } from '../service/transcript.service'
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import FullTranscript from '../model/Fulltranscript';
@Component({
  selector: 'app-fulltranscript',
  templateUrl: './fulltranscript.component.html',
  styleUrls: ['./fulltranscript.component.scss']
})
export class FulltranscriptComponent implements OnInit {
  soHieu: any;
  show: boolean = true;
  hidden: boolean = false;

  danhsachbangdiem: any
  constructor(private modalService: BsModalService,private as: ApiService, private cookieService: CookieService, private ts: TranscriptService) { }
  bangDiem: FullTranscript
  checksua: boolean = false
  checktao: boolean = true
  modalRef: BsModalRef;
  searchText
  ngOnInit() {
    this.getstudent()
  }

  getstudent() {
    var data = {
      soHieu: this.cookieService.get('GVCN'),
      mon: this.cookieService.get('chuyenmon')
    }
    this.ts.getalltrancript(data).subscribe(res => {
      let ts = Object.assign(res)
      // this.danhsachbangdiem = new FullTranscript()
      this.danhsachbangdiem = ts.transcript.transcript

      // = student.list.liststudent;
      // this.innitDatatable(this.danhsachbangdiem)
      // this.isshow = true

    })
  }
  getobj(student) {
    // this.bangDiem = student
    this.getfulltranscript(student.idHocSinh)
    this.checksua = true
    this.checktao = false
    // this.khoilop=this.User.quanHe[0].khoi,
    // this.soHieu=this.User.quanHe[0].soHieu,
    // this.hocsinh=this.User.quanHe[0].tenHocSinh
  }
  trangthainhanxet() {
    this.hidden = true;
    this.show = false
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  
  }
  close() {
    this.modalRef.hide();
  }
  getfulltranscript(idHocSinh) {
    let id = idHocSinh
    this.ts.getfulltranscript(id).subscribe(data => {
      let res = Object.assign(data)
      console.log(res)
      this.bangDiem = res.transcript.transcript
    })
  }
  nhapnhanxet( bangDiem) {
    let data = {
      idHocSinh: bangDiem.idHocSinh,
      nhanxet: bangDiem.nhanXet.caNam
    }
    this.ts.update(data).subscribe(data=>{
      let res=Object.assign(data)
      this.bangDiem = res.transcript.transcript
    })
  }
}
