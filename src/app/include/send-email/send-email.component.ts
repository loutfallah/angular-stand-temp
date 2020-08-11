import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MailingService } from 'src/app/service/mailing.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  mailForm: FormGroup;
  submitted = false;
  savevalide = false;
  get f() { return this.mailForm.controls; }
  constructor(
    private formBuilder: FormBuilder,
    private mailSRV:MailingService
    
    ) { }

  ngOnInit() {
    this.mailForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(6)]],
      email : ['', [Validators.required, Validators.email]],
      message: ['',[Validators.required, Validators.minLength(10)]]
    })
    
  }
  sendmail(){
    this.mailSRV.sendmail(this.mailForm.value).subscribe(resp => {
      this.savevalide = true;
      this.submitted = false;
      this.ngOnInit();
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.mailForm.invalid) {
        return;
    }

    this.sendmail()
}

}


