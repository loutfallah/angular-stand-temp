import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GalerieService } from 'src/app/service/galerie.service';
import { VideoService } from 'src/app/service/video.service';
import { DocumentService } from 'src/app/service/document.service';
import { LienExternService } from 'src/app/service/lien-extern.service';
import { ReseauxSociauxeService } from 'src/app/service/reseaux-sociauxe.service';
import { StandService } from 'src/app/service/stand.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Helpers } from 'src/app/helpers';

@Component({
  selector: 'app-complete-stand-body',
  templateUrl: './complete-stand-body.component.html',
  styleUrls: ['./complete-stand-body.component.css']
})
export class CompleteStandBodyComponent implements OnInit {
  _standData : Array<any>;
  _stand_id:number;

  constructor(
    private formBuilder: FormBuilder,
    private _route :ActivatedRoute,
    private Srvgalerie: GalerieService,
    private SrvDocument: DocumentService,
    private SrvLienExterns: LienExternService,
    private SrvReseaux: ReseauxSociauxeService,
    private SrvVideo: VideoService,
    private SRVstand: StandService,
    private sanitizer:DomSanitizer

    ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._stand_id = params['id'];
     this.getStandById(this._stand_id);
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
        this._document = data.document;
        this._lien_extern = data.lien_extern;
        this._reseau = data.reseau;
        this._video = data.video;
      },
      err => {
        console.error(err);
      }
    );
   }

   getEmbedUrl(item){
    return this.sanitizer.bypassSecurityTrustResourceUrl('//www.youtube.com/embed/'+item);
  }



  
    /* Start Lien Externs */
   _lien_extern : Array<any>;

   LienExternsForm = this.formBuilder.group({
     name: ['', Validators.required],
     link: ['', Validators.required],
     stand_id:[]
    });

    registerLienExterns(){
      const registerExcaption = {
        next: x => console.log('ajouter bien' + x),
        error: err => console.log('error add' + err)
      };
      this.LienExternsForm.patchValue({'stand_id':this._stand_id})
      this.SrvLienExterns.register(this.LienExternsForm.value).subscribe(registerExcaption);
    }

    /* Start Reseaux */

    _reseau : Array<any>;
    
    ReseauxForm = this.formBuilder.group({
     name: ['', Validators.required],
     link: ['', Validators.required],
     keyword: ['', Validators.required],
     stand_id:[]
   });

   registerReseaux (){
    const registerExcaption = {
      next: x => console.log('ajouter bien' + x),
      error: err => console.log('error add' + err)
    };
    this.ReseauxForm.patchValue({'stand_id':this._stand_id})
    this.SrvReseaux.register(this.ReseauxForm.value).subscribe(registerExcaption);
  }
   /* Start Video */

   _video : Array<any>;

   VideoForm = this.formBuilder.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    link: ['', Validators.required],
    stand_id:[]
  });

  registerVideo(){
    const registerExcaption = {
      next: x => console.log('ajouter bien' + x),
      error: err => console.log('error add' + err)
    };
    console.log(this.VideoForm.get('id').value)
    if(this.VideoForm.get('id').value == ""){
      this.VideoForm.patchValue({'stand_id':this._stand_id})
      this.SrvVideo.register(this.VideoForm.value).subscribe(registerExcaption);
    }else{
      this.SrvVideo.updateVideo(this.VideoForm.value,this.VideoForm.get('id').value).subscribe(registerExcaption);
    }
    this.VideoForm.reset();
    this.ngOnInit()
  }
  getVideoById(id){
    this.SrvVideo.getVideoById(id).subscribe(
      data => {
        console.log(data.name);
        this.VideoForm.patchValue({
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

  suprimerVideo(id){
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
        this.SrvVideo.suprimerVideo(id).subscribe(() => {
          this.ngOnInit();
        });
        Swal.fire({
          title: 'Supprimer!',
          text: 'Votre article a été supprimé.',
          icon: 'success',
          timer: 3000,
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Votre article est sûr :)',
          'error'
        )
      }
    })
    
   }

   /* Start Document */

   _document : Array<any>;

  DocumentForm = this.formBuilder.group({
    name: ['', Validators.required],
    file: ['', Validators.required],
    stand_id:[]
  });

 
   
  registerDocument(){
    const registerExcaption = {
      next: x => console.log('ajouter bien' + x),
      error: err => console.log('error add' + err)
    };
    this.DocumentForm.patchValue({'stand_id':this._stand_id})
    this.SrvDocument.register(this.DocumentForm.value).subscribe(registerExcaption);
  }

   /* Start Galerie */

   _galerie : Array<any>;

   galerieForm = this.formBuilder.group({
     name: ['', Validators.required],
     link: ['', Validators.required],
     keyword: ['', Validators.required],
     stand_id:[]
   });

   registerGalerie(){
    const registerExcaption = {
      next: x => console.log('ajouter bien' + x),
      error: err => console.log('error add' + err)
    };
    this.galerieForm.patchValue({'stand_id':this._stand_id})
    console.log(this.galerieForm.value);
    this.Srvgalerie.register(this.galerieForm.value).subscribe(registerExcaption);
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

   suprimerGalerie(id){
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
        });
        Swal.fire({
          title: 'Supprimer!',
          text: 'Votre article a été supprimé.',
          icon: 'success',
          timer: 3000,
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Votre article est sûr :)',
          'error'
        )
      }
    })
   }


}


