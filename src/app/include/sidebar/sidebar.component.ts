import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  _userLogin;

  constructor(private loginSRV:AuthentificationService) {
    
   }

  ngOnInit() {
    console.log("kain wla la ");
    console.log(this.islog());
    this.getUserLogin();
     $(".sidebar-dropdown > a").click(function() {
  $(".sidebar-submenu").slideUp(200);
  if (
    $(this)
      .parent()
      .hasClass("active")
  ) {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .parent()
      .removeClass("active");
  } else {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .next(".sidebar-submenu")
      .slideDown(200);
    $(this)
      .parent()
      .addClass("active");
  }
});

$("#close-sidebar").click(function() {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function() {
  $(".page-wrapper").addClass("toggled");
});

  }

getUserLogin(){
  this.loginSRV.getUserLogin().subscribe(data =>{
    this._userLogin = data
    console.log("hhhhhhhhhhhii")
    console.log(data);
  },
  err => {
    console.error(err);
  }
  );
}

isnull(object) {
  if (object !== undefined) {
    return true;
  }
  return false;
}

islog(){
  return this.loginSRV.loggedIn();
}



}
