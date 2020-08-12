import { Component, OnInit } from '@angular/core';
import { Helpers } from 'src/app/helpers';

@Component({
  selector: 'app-add-stand',
  templateUrl: './add-stand.component.html',
  styleUrls: ['./add-stand.component.css']
})
export class AddStandComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Helpers.initLayout();
  }

}
