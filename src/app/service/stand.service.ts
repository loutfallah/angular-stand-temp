import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StandService {
  api = environment.api_url;

  constructor(private http: HttpClient,private _router:Router) { }

  selectAllStands(){
    return this.http.get<any>(this.api+"/stand");
  }

  selectStandById(id : number){
    
    return this.http.get<any>(this.api +"/stand/" + id);
  }
  register(model: any){
    
    return this.http.post<any>(this.api+"/stand",model)
  }
  suprimerStand(id){
    return this.http.delete<any>(this.api+"/stand/"+ id);
  }
}
