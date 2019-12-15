import { Component, OnInit } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { create } from 'domain';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {NotificationService} from  '../service/notification.service'
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  res:any
  notiForm: FormGroup
  listnoti:any
  searchText;
  Noti:any
  checksua: boolean = false
  checktao: boolean = true
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,private fb: FormBuilder,private nt: NotificationService,private cookieService:CookieService) { 
    this.createform()
  }
  createform() {
    this.notiForm = this.fb.group({
      noiDung: [''],
      chuDe: [''],
   
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  
  }
  close() {
    this.modalRef.hide();
  }
  // create(){
    
    //  let noti=$('noti').html()
    //  console.log(this.ckeditorContent)
    // this.ckeditorContent.content=this.ckeditorContent.content.replace(/<img /g, '<img style="max-width:100%;height:auto" ');
    // this.ckeditorContent.content=this.ckeditorContent.content.replace(/<video /g, '<video style="max-width:100%;height:auto" ');
    // this.ckeditorContent.content=this.ckeditorContent.content.replace(/<iframe /g, '<iframe style="max-width:100%;height:auto" ');
    // this.ckeditorContent.content=this.ckeditorContent.content.replace('style="max-width:100%;height:auto" style="max-width:100%;height:auto" ', '')
  // }
  
create(chuDe,noiDung){
  var today = new Date();
  var time=today.getTime()
  var data={
    gioTao: time,
    nguoiTao:this.cookieService.get('id'),
    hinh:this.cookieService.get('hinh'),
    chuDe:chuDe,
    noiDung:noiDung
  }
this.nt.taonoti(data).subscribe(data=>{
  this.res=Object.assign(data)
  if(this.res.status==200){
    window.alert("Tạo thông báo thành công!")
   this.getnoti()
   
  }
})
}
Xoa(){
  this.nt.deletenoti(this.Noti.idfirebase).subscribe(data=>{
    this.res=Object.assign(data)
    if(this.res.status==200){
      window.alert("Xóa thành công")
      this.close()
      this.getnoti()
    }
  })
}
getobj(noti) {
  this.Noti = noti
  this.checksua=true
  this.checktao=false
  // this.khoilop=this.User.quanHe[0].khoi,
  // this.soHieu=this.User.quanHe[0].soHieu,
  // this.hocsinh=this.User.quanHe[0].tenHocSinh
}
getnoti(){
  this.nt.laydanhsachnoti().subscribe(data=>{
    var noti=Object.assign(data)
    this.listnoti=noti.listnoti
  
  })
}
  ngOnInit() :void{
    this.getnoti()
  }

}
