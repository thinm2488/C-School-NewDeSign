import { Component, OnInit } from '@angular/core';
import Student from '../model/Student'
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-dayoff',
  templateUrl: './dayoff.component.html',
  styleUrls: ['./dayoff.component.scss']
})
export class DayoffComponent implements OnInit {

  dayoff:any;
  student:Student
  Dayoff:any
  checksua: boolean = false
  checktao: boolean = true
  trangthai:string
  constructor(private apiService: ApiService) { }

  ngOnInit() {
   this.getdayoff()
   
     
  }
  getdayoff(){
    this.apiService.getalldayoff()
    .subscribe(data => {
      let dayoff = Object.assign(data)
      //for (let index = 0; index < user.length; index++) {
      this.dayoff=dayoff.dayofflist
      for(let i=0;i<=this.dayoff.length;i++){
        if(this.dayoff[i].trangThai==true){
         this.dayoff[i].trangThai="ĐÃ DUYỆT"
        }
        else{
          this.dayoff[i].trangThai="CHƯA DUYỆT"
        }
       
      }
      return this.dayoff
    }
    
    )


  
  }
  getobj(dayoff) {
    this.Dayoff = dayoff
    this.checksua=true
    this.checktao=false
    // this.khoilop=this.User.quanHe[0].khoi,
    // this.soHieu=this.User.quanHe[0].soHieu,
    // this.hocsinh=this.User.quanHe[0].tenHocSinh
  }
  duyet(){
    let data={
      id:this.Dayoff._id
    }
    this.apiService.alloweddayoff(data).subscribe(data=>{
      window.alert("Duyệt Thành Công")

      this.getdayoff()
    
    })

  }
}
