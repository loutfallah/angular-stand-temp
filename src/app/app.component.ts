import { Component } from '@angular/core';
import { Helpers } from './helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stands-front-end';
  ngOnInit(){
    Helpers.initLayout();
  }
}
