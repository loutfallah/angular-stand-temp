import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReseauxSociauxeService {

  api = environment.api_url;

  constructor(private http: HttpClient,private _router:Router) { }


  register(model: any){
    return this.http.post(this.api+"/reseaux-sociaux",model);
  }
  suprimerReseaux(id){
    return this.http.delete<any>(this.api+"/reseaux-sociaux/"+ id);
  }
  getReseauxById(id){
    return this.http.get<any>(this.api+"/reseaux-sociaux/"+ id);
  }
  updateReseaux(model: any,id){
    return this.http.put(this.api+"/reseaux-sociaux/"+ id,model);
  }
}
