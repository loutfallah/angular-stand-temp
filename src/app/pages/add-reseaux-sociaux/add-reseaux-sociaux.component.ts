import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LienExternService } from 'src/app/service/lien-extern.service';
import { StandService } from 'src/app/service/stand.service';
import { Helpers } from 'src/app/helpers';
import Swal from 'sweetalert2';
import { ReseauxSociauxeService } from 'src/app/service/reseaux-sociauxe.service';

@Component({
  selector: 'app-add-reseaux-sociaux',
  templateUrl: './add-reseaux-sociaux.component.html',
  styleUrls: ['./add-reseaux-sociaux.component.css']
})
export class AddReseauxSociauxComponent implements OnInit {

  
  _standData : Array<any>;
  _stand_id:number;
  _reseau : Array<any>;
  ReseauxForm
  constructor(
    private formBuilder: FormBuilder,
    private _route :ActivatedRoute,
    private SrvReseaux: ReseauxSociauxeService,
    private SRVstand: StandService,
    private _router:Router

    ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._stand_id = params['id'];
     this.getStandById(this._stand_id);
     this.ReseauxForm = this.formBuilder.group({
      name: ['', Validators.required],
      link: ['', Validators.required],
      stand_id:[],
      id: ['', Validators.required]
 
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
        this._reseau = data.reseau;
      },
      err => {
        console.error(err);
      }
    );
   }

   registerReseaux(){
    const registerExcaption = {
      next: x => console.log('ajouter bien' + x),
      error: err => console.log('error add' + err)
    };
    
    this.ReseauxForm.patchValue({'stand_id':this._stand_id});
    if(this.ReseauxForm.get('id').value == ""){
      this.SrvReseaux.register(this.ReseauxForm.value).subscribe(registerExcaption);
    }else{
    this.SrvReseaux.updateReseaux(this.ReseauxForm.value,this.ReseauxForm.get('id').value).subscribe(registerExcaption);

    }
  }

  getLienReseauxById(id){
    this.SrvReseaux.getReseauxById(id).subscribe(
      data => {
        console.log(data.name);
        this.ReseauxForm.patchValue({
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

   deleteReseaux(id){
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
        this.SrvReseaux.suprimerReseaux(id).subscribe(() => {
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

   addReseaux(){
    Swal.fire({
      title: 'Voulez-vous ajouter une image?',
      icon: 'question',
      timer: 6000,
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
       }).then((result) => {
      if (result.value) {
        this.registerReseaux();
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
  this._router.navigate(['/sociaux',this._stand_id]);  
}

closemodel(){
  document.getElementById("modalLienExterns").click();
}

}
