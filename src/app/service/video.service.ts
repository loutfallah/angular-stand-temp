import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  api = environment.api_url;

  constructor(private http: HttpClient,private _router:Router) { }


  register(model: any){
    return this.http.post(this.api+"/video",model);
  }

  updateVideo(model: any,id){
    return this.http.put(this.api+"/video/"+ id,model);
  }

  getVideoById(id){
    return this.http.get<any>(this.api+"/video/"+ id);
  }
  suprimerVideo(id){
    return this.http.delete<any>(this.api+"/video/"+ id);
  }
}
