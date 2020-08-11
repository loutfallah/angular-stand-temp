import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-temoignage-body',
  templateUrl: './temoignage-body.component.html',
  styleUrls: ['./temoignage-body.component.css']
})
export class TemoignageBodyComponent implements OnInit {
  @Input() _temoignage:Array<any>;

  
  constructor() { }

  ngOnInit() {
  }

}
