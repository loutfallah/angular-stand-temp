import { Component, OnInit } from '@angular/core';
import { Helpers } from 'src/app/helpers';

@Component({
  selector: 'app-stands',
  templateUrl: './stands.component.html',
  styleUrls: ['./stands.component.css']
})
export class StandsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Helpers.initLayout();
  }

}
