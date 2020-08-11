import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-galerie-body',
  templateUrl: './galerie-body.component.html',
  styleUrls: ['./galerie-body.component.css']
})
export class GalerieBodyComponent implements OnInit {
  @Input() _galerie:Array<any>;
  constructor() { }

  ngOnInit() {
    console.log(this._galerie);
  }

}
