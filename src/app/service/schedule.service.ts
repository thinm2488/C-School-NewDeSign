import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }
  getschedule(data){
    return this.http.post("/api/route/schedule/byclass",data)
  
  }
  updateschedule(data){
    return this.http.put("/api/route/schedule/update",data)
  
  }
  create(data){
    return this.http.post("/api/route/schedule/create",data)
  
  }
}
