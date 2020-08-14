import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar-secondly',
  templateUrl: './sidebar-secondly.component.html',
  styleUrls: ['./sidebar-secondly.component.css']
})
export class SidebarSecondlyComponent implements OnInit {
  _stand_id
  constructor(
    private _route:ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._stand_id = params['id']});
  }

}
