import { Component, OnInit } from '@angular/core';
import { Helpers } from 'src/app/helpers';
import { StandService } from 'src/app/service/stand.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-static-stand',
  templateUrl: './static-stand.component.html',
  styleUrls: ['./static-stand.component.css']
})
export class StaticStandComponent implements OnInit {

  _standData : Array<any>;
  _stand_id : number;
  _galerie : Array<any>;
  _document : Array<any>;
  _lien_extern : Array<any>;
  _reseau : Array<any>;
  _video : Array<any>;

  constructor(
    private SRVstand: StandService,
    private _route :ActivatedRoute,
  ) { }

  ngOnInit() {

    Helpers.initLayout();
    this._route.params.subscribe(params => {
      this._stand_id = params['id'];
      this.getStandById(this._stand_id);
  });
  }

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



}
