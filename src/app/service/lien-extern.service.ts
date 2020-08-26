import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LienExternService {

  api = environment.api_url;

  constructor(private http: HttpClient,private _router:Router) { }


  register(model: any){
    return this.http.post(this.api+"/lien-extern",model);
  }
  suprimerLienExtern(id){
    return this.http.delete<any>(this.api+"/lien-extern/"+ id);
  }
  getLienExternById(id){
    return this.http.get<any>(this.api+"/lien-extern/"+ id);
  }
  updateLienExtern(model: any,id){
    return this.http.put(this.api+"/lien-extern/"+ id,model);
  }
}
