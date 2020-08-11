import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reseaux-sociaux-body',
  templateUrl: './reseaux-sociaux-body.component.html',
  styleUrls: ['./reseaux-sociaux-body.component.css']
})
export class ReseauxSociauxBodyComponent implements OnInit {
  @Input() _reseau:Array<any>;
  
  constructor() { }

  ngOnInit() {
  }

}
