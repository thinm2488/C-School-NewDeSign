import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {

  constructor(private http: HttpClient) {

   }

   importexcel(data){
     return this.http.post('/api/route/transcript/excel',data)
   }
   gettrancript(data){
    return this.http.post('/api/route/transcript/mon',data)
  }
  getfulltranscript(id){
    return this.http.get('/api/route/transcript/'+id)
  }
  getalltrancript(data){
    return this.http.post('/api/route/transcript/transcriptbysubject',data)
  }
  createtranscript(data){
    return this.http.post('/api/route/transcript/create',data)
  }
}
