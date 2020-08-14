import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StandService } from 'src/app/service/stand.service';
import Swal from 'sweetalert2';
import { Helpers } from 'src/app/helpers';
import { VideoService } from 'src/app/service/video.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-videos',
  templateUrl: './add-videos.component.html',
  styleUrls: ['./add-videos.component.css']
})
export class AddVideosComponent implements OnInit {
  

  
  


  
  _standData : Array<any>;
  _stand_id:number;
  _video : Array<any>;
  VideoForm
  constructor(
    private formBuilder: FormBuilder,
    private _route :ActivatedRoute,
    private SrvVideo: VideoService,
    private SRVstand: StandService,
    private sanitizer:DomSanitizer,
    private _router:Router

    ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._stand_id = params['id'];
     this.getStandById(this._stand_id);
     this.VideoForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      link: ['', Validators.required],
      stand_id:[]
    });
     Helpers.initLayout();
     console.log(
      
     )
     
  });
  }
 
/*  Général  */
getEmbedUrl(item){
  return this.sanitizer.bypassSecurityTrustResourceUrl('//www.youtube.com/embed/'+item);
}

  getStandById(id : number){
    
    this.SRVstand.selectStandById(id).subscribe(
      data => {
        console.log(data);
        this._standData = data;
        this._video = data.video;
      },
      err => {
        console.error(err);
      }
    );
   }

   

   registerVideo(){
    const registerExcaption = {
      next: x => console.log('ajouter bien' + x),
      error: err => console.log('error add' + err)
    };
    let idVideo = this.getIdFromUrl(this.VideoForm.get('link').value);
    this.VideoForm.patchValue({'link':idVideo});

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

   deleteVideo(id){
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer ce Video!',
      icon: 'question',
      timer: 6000,
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {
        this.SrvVideo.suprimerVideo(id).subscribe(() => {
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

   addVideo(id){
    Swal.fire({
      title: 'Voulez-vous ajouter une Video?',
      icon: 'question',
      timer: 6000,
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
       }).then((result) => {
      if (result.value) {
        this.registerVideo();
        this.closemodel();
        Swal.fire({
          title: 'ajouter une Video!',
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
  this._router.navigate(['/video',this._stand_id]);  
}

closemodel(){
  document.getElementById("modalVideo").click();
}

getIdFromUrl(url){
  var YouTubeVideoId = require('youtube-video-id');
return YouTubeVideoId(url);
}
}
