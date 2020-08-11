import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StandService } from 'src/app/service/stand.service';

@Component({
  selector: 'app-afficher-stands',
  templateUrl: './afficher-stands.component.html',
  styleUrls: ['./afficher-stands.component.css']
})
export class AfficherStandsComponent implements OnInit {
   _standData : Array<any>;
   _galerie : Array<any>;
   _document : Array<any>;
   _lien_extern : Array<any>;
   _reseau : Array<any>;
   _temoignage : Array<any>;
   _video : Array<any>;

  
  _stand_id:number;

  constructor(
    private _route :ActivatedRoute,
    private SRVstand: StandService,
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._stand_id = params['id'];
      this.getStandById(this._stand_id);
  });
  }

  getStandById(id : number){
    
    this.SRVstand.selectStandById(id).subscribe(
      data => {
        console.log("test data gal : ");
        console.log(data);
        this._standData = data;
        this._galerie = data.galerie;
        this._document = data.document;
        this._lien_extern = data.lien_extern;
        this._reseau = data.reseau;
        this._temoignage = data.temoignage;
        this._video = data.video;

        

        /* console.log(this._galerie) */
      },
      err => {
        console.error(err);
      }
    );
   }

  

}
