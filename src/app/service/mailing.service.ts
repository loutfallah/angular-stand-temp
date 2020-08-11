import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

  api = 'http://127.0.0.1:8000/api';
  
  constructor(private http: HttpClient) { }


  sendmail(model: any){
    return this.http.post(this.api+"/mail",model,{ responseType: 'text' });
  }

}
