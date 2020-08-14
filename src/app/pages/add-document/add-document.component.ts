import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StandService } from 'src/app/service/stand.service';
import { Helpers } from 'src/app/helpers';
import Swal from 'sweetalert2';
import { DocumentService } from 'src/app/service/document.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {

   
  _standData : Array<any>;
  _stand_id:number;
  _document : Array<any>;
  LienExternsForm
  constructor(
    private formBuilder: FormBuilder,
    private _route :ActivatedRoute,
    private SrvDocument: DocumentService,
    private SRVstand: StandService,
    private _router:Router

    ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._stand_id = params['id'];
     this.getStandById(this._stand_id);
     this.LienExternsForm = this.formBuilder.group({
      name: ['', Validators.required],
      file: ['', Validators.required],
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
        this._document = data.document;
      },
      err => {
        console.error(err);
      }
    );
   }

   registerDocument(){
    const registerExcaption = {
      next: x => console.log('ajouter bien' + x),
      error: err => console.log('error add' + err)
    };
    
    this.LienExternsForm.patchValue({'stand_id':this._stand_id});
    if(this.LienExternsForm.get('id').value == ""){
      this.SrvDocument.register(this.LienExternsForm.value).subscribe(registerExcaption);
    }else{
    this.SrvDocument.updateDocument(this.LienExternsForm.value,this.LienExternsForm.get('id').value).subscribe(registerExcaption);

    }
  }

  getDocumentById(id){
    this.SrvDocument.getDocumentById(id).subscribe(
      data => {
        console.log(data.name);
        this.LienExternsForm.patchValue({
          'stand_id':this._stand_id,
          'name':data.name,
          'file': data.file,
          'id': data.id
        })
      },
      err => {
        console.error(err);
      }
    );
  }

   deleteDocument(id){
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
        this.SrvDocument.suprimerDocument(id).subscribe(() => {
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

   addDocument(){
    Swal.fire({
      title: 'Voulez-vous ajouter une image?',
      icon: 'question',
      timer: 6000,
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
       }).then((result) => {
      if (result.value) {
        this.registerDocument();
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
  this._router.navigate(['/document',this._stand_id]);  
}

closemodel(){
  document.getElementById("modalLienExterns").click();
}

}
