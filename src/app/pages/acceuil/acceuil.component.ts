import { Component, OnInit } from '@angular/core';
import { Helpers } from 'src/app/helpers';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Helpers.initLayout();
  }

}
