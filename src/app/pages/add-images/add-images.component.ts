import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GalerieService } from 'src/app/service/galerie.service';
import { StandService } from 'src/app/service/stand.service';
import { Helpers } from 'src/app/helpers';
import { environment } from 'src/environments/environment';
import { Galerie } from 'src/app/models/galerie.model';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent implements OnInit {
  

  submitted;
  root_url = environment.root_url;
  _standData : Array<any>;
  _stand_id:number;
  _galerie : Array<any>;
  url;
  _up_url;
  _data_Img;
  galerieForm;
  constructor(
    private formBuilder: FormBuilder,
    private _route :ActivatedRoute,
    private Srvgalerie: GalerieService,
    private SRVstand: StandService,
    private _router:Router

    ) { }

  ngOnInit() {
    this.submitted = false;
    this._route.params.subscribe(params => {
      this._stand_id = params['id'];
     this.getStandById(this._stand_id);
     this.url= "image.png";
     this.galerieForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(50)]],
      keyword: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(50)]],
      stand_id:[],
      link: ['',Validators.required],
      img:[]
      
     
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
      next: x => console.log(x),
      error: err => console.log('error add' + err)};
    this.galerieForm.patchValue({'stand_id':this._stand_id});
    /* let _img = new Galerie(0,
                                  this.galerieForm.get('name').value,
                                  this.galerieForm.get('link').value,
                                  this.galerieForm.get('keyword').value,
                                  this.galerieForm.get('stand_id').value,
                                  this._data_Img); */
    let formData = new FormData();/* 
    formData.append('data_img', this._data_Img); */
    formData.append('name', this.galerieForm.get('name').value);
    formData.append('link', this.galerieForm.get('link').value);
    formData.append('keyword', this.galerieForm.get('keyword').value);
    formData.append('stand_id', this.galerieForm.get('stand_id').value);

    /* if(this.galerieForm.get('id').value == ""){
      
      this.galerieForm.patchValue({'file':this.url});
      this.Srvgalerie.register(this.galerieForm.value).subscribe(registerExcaption);

      console.log(this.galerieForm.value);
    }else{
      if(this.galerieForm.get('link').value == ""){
        _img.append('link', this.url);
      }
      console.log("formData");
      formData.append('id', this.galerieForm.get('id').value);
      console.log(formData.get('link'));
      this.Srvgalerie.updateGalerie(formData,this.galerieForm.get('id').value).subscribe(registerExcaption);
    } */

    if(this.galerieForm.get('id').value == ""){
      /* this.galerieForm.patchValue({'stand_id':this._stand_id});
      this.galerieForm.patchValue({'img':this._data_Img}); */
      formData.append('img', this._data_Img);
      console.log(formData);
      this.Srvgalerie.register(formData).subscribe(registerExcaption);
    }else{
      /* this.galerieForm.patchValue({'stand_id':this._stand_id});
      this.Srvgalerie.updateGalerie(this.galerieForm.value,this.galerieForm.get('id').value).subscribe(registerExcaption); */
    formData.append('name', this.galerieForm.get('name').value);
    formData.append('link', this.url);
    formData.append('img', this._data_Img);
    formData.append('keyword', this.galerieForm.get('keyword').value);
    formData.append('stand_id', this.galerieForm.get('stand_id').value);
    


    this.Srvgalerie.uplaodimage(formData,this.galerieForm.get('id').value).subscribe(registerExcaption);
    }

  }

  updateImage(){
    
    const registerExcaption = {
      next: x => console.log('ajouter bien' + x),
      error: err => console.log('error add' + err)};
    
      let upForm = this.formBuilder.group({
        id: [this.galerieForm.get('id').value],name: [this.galerieForm.get('name').value],link: [this.url],keyword: [this.galerieForm.get('keyword').value],stand_id:[this._stand_id]
      });
      

    this.Srvgalerie.updateGalerie(upForm.value,this.galerieForm.get('id').value).subscribe(registerExcaption);
    

    
  }

  getImageById(id){
    this.Srvgalerie.getgalerieById(id).subscribe(
      data => {
        this.url = data.link;
        console.log('data.link'+ data.link)
        this.galerieForm.patchValue({
          'stand_id':this._stand_id,
          'name':data.name,
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

   addimage(){
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
        }).then((result) => {/* this.reloadComponent() */ this.ngOnInit()})
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

selectFile(event){

  if(event.target.files){
    var reader = new FileReader();
    
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event:any)=>{
      this.url = event.target.result;
      
      
    }
    this._data_Img = event.target.files[0];
    
    console.log(this._data_Img);
    console.log(typeof(this._data_Img));
  }
}


CreateImageData() {
 /*  this.galerieForm.patchValue({'stand_id':this._stand_id}); */
  const registerExcaption = {
    next: x => console.log(x),
    error: err => console.log(err)}
    /* let formData = new FormData();
    formData.append('data_img', this._data_Img);
    formData.append('name', this.galerieForm.get('name').value);
    formData.append('link', this.galerieForm.get('link').value);
    formData.append('keyword', this.galerieForm.get('keyword').value);
    formData.append('stand_id', this.galerieForm.get('stand_id').value);
    formData.append('img', this._data_Img); */
   /* console.log(this._data_Img);
   let gg = JSON.stringify(this._data_Img);
  this.galerieForm.patchValue({'img':gg}); */
    
   /*  console.log(this.galerieForm.value); */
    /* this.Srvgalerie.updateGalerie(this.galerieForm.value,this.galerieForm.get('id').value).subscribe(registerExcaption); */
    
    let formData = new FormData();/* 
    formData.append('data_img', this._data_Img); */
    formData.append('name', this.galerieForm.get('name').value);
    formData.append('link', this.url);
    formData.append('img', this._data_Img);
    formData.append('keyword', this.galerieForm.get('keyword').value);
    formData.append('stand_id', this.galerieForm.get('stand_id').value);
    


    this.Srvgalerie.uplaodimage(formData,this.galerieForm.get('id').value).subscribe(registerExcaption);
    
}
validSizeFile(file : File){
  if(file !== undefined && file.size > 0 && file.size < 1048576){
    return true;
  }
  return false;
}

onSubmit() {
  this.submitted = true;
  let formVlid= this.galerieForm.controls;
  console.log(this.validSizeFile(this._data_Img));
  // stop here if form is invalid
  if (formVlid.name.errors || formVlid.keyword.errors) {
      return;
  }
  if(this._data_Img !== undefined && !this.validSizeFile(this._data_Img)){
    return;
  }
  if(this.galerieForm.get('id').value == '' && this.galerieForm.get('link').value == ''){
    return;
  }
  this.addimage();
}
get f() { return this.galerieForm.controls; }

}
