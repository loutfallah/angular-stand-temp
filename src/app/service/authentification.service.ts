import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  api = 'http://127.0.0.1:8000/api';
  helper = new JwtHelperService();

  constructor(private http: HttpClient,private _router:Router) { }

  login(model: any) {
    return this.http.post(this.api+"/login",model).pipe(
      map((Response:any)=> {
        const user = Response;
        localStorage.setItem('token',user.token);
        this._router.navigate(['home'])
      })
    )
  }
  register(model: any){
    return this.http.post(this.api+"/register",model);
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/'])
  }
  getUserLogin(){
    return this.http.get<any>(this.api+"/user");
  }

  // loggedIn(){
  //    this.getUserLogin().subscribe(
  //     data =>{
  //       return data;
  //     }
  //   );
  loggedIn() {
    const token = localStorage.getItem("token");
    return !this.helper.isTokenExpired(token);
    /* let rep;
    this.http.get<any>(this.api+"/checkuser").subscribe((data)=>{
      rep = data.status;
    });
    return rep; */
      // (data => {
      //   this.albums = data.map(a => {
      //     if(!a) return null;
      //     return {
      //       id: a.payload.doc.id,
      //       ...a.payload.doc.data()
      //     } as Album;
      //   })
      // });
    }
 

    

    
  }



/* 
if (!_.isEmpty(data)) {
  return true;
}

},
err => {
console.error(err);
} */