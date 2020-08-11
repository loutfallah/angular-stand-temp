import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../service/authentification.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  _isLogin;
  constructor(
    private _loginSRV:AuthentificationService,
    private _router:Router) { }

    /* userIsLogin(){
      this._loginSRV.loggedIn().subscribe((data)=>{
       this._isLogin = data.status;
     }) 
    } */
    canActivate(): boolean {
      
      if (this._loginSRV.loggedIn()) {
        return true
      } else {          
        this._router.navigate(['/login'])
        return false
      }
    }
  
}
