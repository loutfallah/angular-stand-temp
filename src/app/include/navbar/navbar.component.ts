import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _loginSRV:AuthentificationService
    ) { }

  ngOnInit() {
  }
  userIsLogin(){
    return this._loginSRV.loggedIn();
  }

  logout(){
    this._loginSRV.logoutUser()
  }

}
