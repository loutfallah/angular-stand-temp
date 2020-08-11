import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-document-body',
  templateUrl: './document-body.component.html',
  styleUrls: ['./document-body.component.css']
})
export class DocumentBodyComponent implements OnInit {
  @Input() _document:Array<any>;

  
  constructor() { }

  ngOnInit() {
  }

}
