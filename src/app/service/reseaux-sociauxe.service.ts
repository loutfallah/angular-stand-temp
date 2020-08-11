import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReseauxSociauxeService {

  api = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient,private _router:Router) { }


  register(model: any){
    return this.http.post(this.api+"/reseaux-sociaux",model);
  }
  suprimerReseaux(id){
    return this.http.delete<any>(this.api+"/reseaux-sociaux/"+ id);
  }
}
