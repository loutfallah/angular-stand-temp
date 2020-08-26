import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GalerieService {

  api = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient,private _router:Router) { }


  register(model: any){
    return this.http.post(this.api+"/galerie",model);
  }
  suprimergalerie(id){
    return this.http.delete<any>(this.api+"/galerie/"+ id);
  }
  getgalerieById(id){
    return this.http.get<any>(this.api+"/galerie/"+ id);
  }
  updateGalerie(model: any,id){
   /*  let headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    let options = { headers: headers }; */
    return this.http.patch(this.api+"/galerie/"+ id,model);
  }
  uplaodimage(model: any, id){
    return this.http.post(this.api+"/img/"+ id,model);
  }
}
