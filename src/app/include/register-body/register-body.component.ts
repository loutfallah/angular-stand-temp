import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-register-body',
  templateUrl: './register-body.component.html',
  styleUrls: ['./register-body.component.css']
})
export class RegisterBodyComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  savevalide = false;

  /* registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role_id: ['', Validators.required],
  }); */
get f() { return this.registerForm.controls; }
  constructor(
    private formBuilder: FormBuilder,
    private loginSRV:AuthentificationService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword : ['', Validators.required],
        role_id: ['', Validators.required]
    }, {
      validator: this.confirmPasswordMatch('password', 'confirmPassword')
  });
}

confirmPasswordMatch(controlName: string, matchingControlName: string) {    
  return (formGroup: FormGroup) => {
    // console.log(controlName, matchingControlName)
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmPasswordMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

  getRegister(){
    this.loginSRV.register(this.registerForm.value).toPromise().then((data : any)=>{
      this.savevalide = true;
    });;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    /* alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value)) */
    this.getRegister()
}
}
