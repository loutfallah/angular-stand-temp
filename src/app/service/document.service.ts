import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  api = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient,private _router:Router) { }

  
  register(model: any){
    return this.http.post(this.api+"/document",model);
  }

  suprimerDocument(id){
    return this.http.delete<any>(this.api+"/document/"+ id);
  }
}
