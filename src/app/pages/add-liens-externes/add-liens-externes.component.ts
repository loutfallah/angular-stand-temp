import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StandService } from 'src/app/service/stand.service';
import { Helpers } from 'src/app/helpers';
import Swal from 'sweetalert2';
import { LienExternService } from 'src/app/service/lien-extern.service';

@Component({
  selector: 'app-add-liens-externes',
  templateUrl: './add-liens-externes.component.html',
  styleUrls: ['./add-liens-externes.component.css']
})
export class AddLiensExternesComponent implements OnInit {

  submitted;
  _standData : Array<any>;
  _stand_id:number;
  _lien_extern : Array<any>;
  LienExternsForm
  constructor(
    private formBuilder: FormBuilder,
    private _route :ActivatedRoute,
    private SrvLienExterns: LienExternService,
    private SRVstand: StandService,
    private _router:Router

    ) { }

  ngOnInit() {
    this.submitted = false;
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this._route.params.subscribe(params => {
      this._stand_id = params['id'];
     this.getStandById(this._stand_id);
     this.LienExternsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      link: ['', [Validators.required, Validators.pattern(reg),Validators.minLength(4),Validators.maxLength(200)]],
      stand_id:[''],
      id: ['']
 
    });
     Helpers.initLayout();
     
  });
  }
 
/*  Général  */

  getStandById(id : number){
    
    this.SRVstand.selectStandById(id).subscribe(
      data => {
        console.log(data);
        this._standData = data;
        this._lien_extern = data.lien_extern;
      },
      err => {
        console.error(err);
      }
    );
   }

   registerLienExterns(){
    const registerExcaption = {
      next: x => console.log('ajouter bien' + x),
      error: err => console.log('error add' + err)
    };
    
    this.LienExternsForm.patchValue({'stand_id':this._stand_id});
    if(this.LienExternsForm.get('id').value == ""){
      this.SrvLienExterns.register(this.LienExternsForm.value).subscribe(registerExcaption);
    }else{
    this.SrvLienExterns.updateLienExtern(this.LienExternsForm.value,this.LienExternsForm.get('id').value).subscribe(registerExcaption);

    }
  }

  getLienExternsById(id){
    this.SrvLienExterns.getLienExternById(id).subscribe(
      data => {
        console.log(data.name);
        this.LienExternsForm.patchValue({
          'stand_id':this._stand_id,
          'name':data.name,
          'link': data.link,
          'id': data.id
        })
      },
      err => {
        console.error(err);
      }
    );
  }

   deleteLienExterns(id){
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer ce fichier!',
      icon: 'question',
      timer: 6000,
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {
        this.SrvLienExterns.suprimerLienExtern(id).subscribe(() => {
          this.ngOnInit();
          this.closemodel();
        });
        Swal.fire({
          title: 'Supprimer!',
          text: 'Votre article a été supprimé.',
          icon: 'success',
          timer: 3000,
        }).then((result) => {this.reloadComponent()})
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Votre article est sûr :)',
          'error'
        )
      }
    })
   }

   addLienExterns(){
    Swal.fire({
      title: 'Voulez-vous ajouter une image?',
      icon: 'question',
      timer: 6000,
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
       }).then((result) => {
      if (result.value) {
        this.registerLienExterns();
        this.closemodel();
        Swal.fire({
          title: 'ajouter une image!',
          text: 'Votre article a été ajouter.',
          icon: 'success',
          timer: 3000,
        }).then((result) => {this.reloadComponent()})
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'error'
        )
      }
    })
}

reloadComponent() {
  this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  this._router.onSameUrlNavigation = 'reload';
  this._router.navigate(['/liens',this._stand_id]);  
}

closemodel(){
  document.getElementById("modalLienExterns").click();
}

onSubmit() {
  this.submitted = true;
  let formVlid= this.LienExternsForm.controls

  // stop here if form is invalid
  if (formVlid.name.errors || formVlid.link.errors) {
      return;
  }
  this.addLienExterns();
}
get f() { return this.LienExternsForm.controls; }
}
