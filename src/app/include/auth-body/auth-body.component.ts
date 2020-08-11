import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-auth-body',
  templateUrl: './auth-body.component.html',
  styleUrls: ['./auth-body.component.css']
})
export class AuthBodyComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginSRV:AuthentificationService,) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  get f() { return this.loginForm.controls; }


  getLogin(){
    const loginExcaption = {
      next: x => console.log('you are login' + x),
      error: err => console.log('you are not login' + err)
    };
    console.log(this.loginForm.value);
    this.loginSRV.login(this.loginForm.value).subscribe(loginExcaption);
  }
  


  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    /* alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value)) */
    this.getLogin();
}

}
