import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GalerieService {

  api = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient,private _router:Router) { }


  register(model: any){
    console.log('hhhhhhh')
    return this.http.post(this.api+"/galerie",model);
  }
  suprimergalerie(id){
    return this.http.delete<any>(this.api+"/galerie/"+ id);
  }
  getgalerieById(id){
    return this.http.get<any>(this.api+"/galerie/"+ id);
  }
  updateGalerie(model: any,id){
    return this.http.put(this.api+"/galerie/"+ id,model);
  }
}
