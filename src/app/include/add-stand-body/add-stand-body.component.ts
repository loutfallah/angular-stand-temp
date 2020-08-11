import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { StandService } from 'src/app/service/stand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stand-body',
  templateUrl: './add-stand-body.component.html',
  styleUrls: ['./add-stand-body.component.css']
})
export class AddStandBodyComponent implements OnInit {

  standForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    theme_id: ['', Validators.required],
    espace_exposition_id: ['', Validators.required],
    status: ['no complete', Validators.required]
  });

  constructor(
    private standSRV: StandService,
    private formBuilder: FormBuilder,
    private _router:Router
  ) { 
    
  }
  

  RegisterStand(){
    /* const registerExcaption = {
      next: x => console.log('stand register' + x),
      error: err => console.log('non register' + err)
    }; */
    let data;
    this.standSRV.register(this.standForm.value).toPromise().then((data : any)=>{
      console.log('hhhhh' + data);
    });;
    /* .subscribe(register Excaption);
    console.log('hhhhh' + stand);
     */
    this._router.navigate(['stands'])
  }
  ngOnInit() {
  }

}
