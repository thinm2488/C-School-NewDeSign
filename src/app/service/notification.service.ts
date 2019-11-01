import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  taonoti(data) {
    return this.http.post('/api/route/notification/create', data)
  }
  laydanhsachnoti(){
    return this.http.get('/api/route/notification/')
  }
  suanoti(data) {
    return this.http.put('/api/route/notification/edit', data)
  }
  laychitietnoti(id) {
    return this.http.get('/api/route/notification/'+ id)
  }
  deletenoti(id) {
    return this.http.delete('/api/route/notification/'+ id)
  }
}
