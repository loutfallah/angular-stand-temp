import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GalerieService } from 'src/app/service/galerie.service';
import { StandService } from 'src/app/service/stand.service';
import { Helpers } from 'src/app/helpers';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent implements OnInit {
  


  
  _standData : Array<any>;
  _stand_id:number;
  _galerie : Array<any>;
  galerieForm
  constructor(
    private formBuilder: FormBuilder,
    private _route :ActivatedRoute,
    private Srvgalerie: GalerieService,
    private SRVstand: StandService,
    private _router:Router

    ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._stand_id = params['id'];
     this.getStandById(this._stand_id);
     this.galerieForm = this.formBuilder.group({
      name: ['', Validators.required],
      link: ['', Validators.required],
      keyword: ['', Validators.required],
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
        this._galerie = data.galerie;
      },
      err => {
        console.error(err);
      }
    );
   }

   registerGalerie(){
    const registerExcaption = {
      next: x => console.log('ajouter bien' + x),
      error: err => console.log('error add' + err)
    };
    if(this.galerieForm.get('id').value == ""){
      this.galerieForm.patchValue({'stand_id':this._stand_id});
      this.Srvgalerie.register(this.galerieForm.value).subscribe(registerExcaption);
    }else{
      this.galerieForm.patchValue({'stand_id':this._stand_id});
      this.Srvgalerie.updateGalerie(this.galerieForm.value,this.galerieForm.get('id').value).subscribe(registerExcaption);
    }

  }

  getImageById(id){
    this.Srvgalerie.getgalerieById(id).subscribe(
      data => {
        console.log(data.name);
        this.galerieForm.patchValue({
          'stand_id':this._stand_id,
          'name':data.name,
          'link': data.link,
          'keyword': data.keyword,
          'id': data.id
        })
      },
      err => {
        console.error(err);
      }
    );
  }

   deleteimage(id){
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
        this.Srvgalerie.suprimergalerie(id).subscribe(() => {
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

   addimage(id){
    Swal.fire({
      title: 'Voulez-vous ajouter une image?',
      icon: 'question',
      timer: 6000,
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
       }).then((result) => {
      if (result.value) {
        this.registerGalerie();
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
  this._router.navigate(['/img',this._stand_id]);  
}

closemodel(){
  document.getElementById("modalGalerie").click();
}

}
