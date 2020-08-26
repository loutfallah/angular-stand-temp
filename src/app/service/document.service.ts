import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  api = environment.api_url;

  constructor(private http: HttpClient,private _router:Router) { }

  
  register(model: any){
    return this.http.post(this.api+"/document",model);
  }

  suprimerDocument(id){
    return this.http.delete<any>(this.api+"/document/"+ id);
  }
  getDocumentById(id){
    return this.http.get<any>(this.api+"/document/"+ id);
  }
  updateDocument(model: any,id){
    return this.http.put(this.api+"/document/"+ id,model);
  }
}
